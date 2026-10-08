import copy
import importlib.util
import pathlib
import unittest
from unittest.mock import patch

PATH = pathlib.Path(__file__).parents[1] / "generate-blog-post.py"
SPEC = importlib.util.spec_from_file_location("generator", PATH)
generator = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(generator)


class PublishingGuards(unittest.TestCase):
    def setUp(self):
        self.brief = {
            "status": "reviewed", "reviewed_on": "2026-10-09", "review_by": "2027-01-07",
            "question": "시험 질문", "facts": ["시험 사실"],
            "sources": [{"title": "원문", "url": "https://example.com/source", "scope": "시험"}],
        }
        self.inventory = [("기초", "/blog/basics"), ("비교", "/blog/compare")]
        self.text = f'''---
title: "검사 시험"
description: "형식 검사에 사용하는 비공개 시험 입력"
date: {generator.local_today()}
tags: [시험]
draft: false
---

이 입력은 생성기를 검증하기 위한 시험용 글입니다. 공개 글이나 실제 기술 안내로 사용하지 않습니다. 질문에 답하는 첫 문단의 형식을 검사합니다.

## 역할

{' '.join(['시험용 설명입니다'] * 370)}

## 조건

시험 조건을 설명합니다.

## 자주 묻는 질문

Q. 첫 질문?
A. 시험 답변입니다.

Q. 둘째 질문?
A. 시험 답변입니다.

Q. 셋째 질문?
A. 시험 답변입니다.

<ContactCta headline="제작 상담" />

## 참고 자료

- [원문](https://example.com/source)

## 다음 읽을거리

- [기초](/blog/basics)
- [비교](/blog/compare)
'''

    def result(self, text):
        return generator.validate_mdx(text, self.brief, self.inventory)

    def test_valid_structure(self):
        self.assertTrue(self.result(self.text)[0])

    def test_banned_symbols(self):
        for symbol in ("**", "—"):
            self.assertFalse(self.result(self.text + symbol)[0])

    def test_invented_source(self):
        self.assertFalse(self.result(self.text + "\n[출처](https://fake.example/claim)")[0])

    def test_missing_reference(self):
        self.assertFalse(self.result(self.text.replace("https://example.com/source", "/contact"))[0])

    def test_bad_internal_link(self):
        self.assertFalse(self.result(self.text.replace("/blog/basics", "/blog/nonexistent"))[0])

    def test_upper_cta(self):
        moved = self.text.replace('<ContactCta headline="제작 상담" />', "")
        self.assertFalse(self.result(moved.replace("## 역할", '<ContactCta />\n## 역할'))[0])

    def test_multiple_ctas(self):
        self.assertFalse(self.result(self.text + "\n<ContactCta />")[0])

    def test_draft_and_date(self):
        self.assertFalse(self.result(self.text.replace("draft: false", "draft: true"))[0])
        self.assertFalse(self.result(self.text.replace(str(generator.local_today()), "2000-01-01"))[0])

    def test_unsupported_rule_and_rating(self):
        for claim in ("KEC 132.3", "ip-66", "예외 없이 2P"):
            self.assertFalse(self.result(self.text + claim)[0])

    def test_missing_faq(self):
        self.assertFalse(self.result(self.text.replace("Q. 셋째", "질문. 셋째"))[0])

    def test_unreviewed_quantities(self):
        for value in ("50 Nm", "385A", "30 mA", "5 mm"):
            self.assertFalse(self.result(self.text + value)[0])
        self.brief["facts"].append("검토한 치수 75 mm")
        self.assertTrue(self.result(self.text + "75 mm")[0])

    def test_short_and_long(self):
        self.assertFalse(self.result(self.text.replace(' '.join(['시험용 설명입니다'] * 370), "짧음"))[0])
        self.assertFalse(self.result(self.text + " 시험" * 1500)[0])

    def test_expired_brief(self):
        with patch.object(generator, "local_today", return_value=generator.datetime.date(2026, 10, 9)):
            self.assertTrue(generator.brief_ready(self.brief))
            expired = copy.deepcopy(self.brief)
            expired["review_by"] = "2026-10-08"
            self.assertFalse(generator.brief_ready(expired))
            self.assertFalse(generator.brief_ready(None))

    def test_queue_skips_unreviewed_topics(self):
        q = {"topics": [{"slug": "unknown", "status": "pending"}, {"slug": "ready", "status": "pending"}]}
        with patch.object(generator, "local_today", return_value=generator.datetime.date(2026, 10, 9)):
            self.assertEqual(generator.next_pending(q, {"ready": self.brief})[0], 1)
            self.assertEqual(generator.next_pending(q, {}), (None, None))

    def test_actual_queue_and_briefs(self):
        queue, briefs = generator.load_queue(), generator.load_briefs()
        slugs = [t["slug"] for t in queue["topics"]]
        self.assertEqual(len(slugs), len(set(slugs)))
        with patch.object(generator, "local_today", return_value=generator.datetime.date(2026, 10, 9)):
            self.assertEqual(len([b for b in briefs.values() if generator.brief_ready(b)]), 12)
        self.assertTrue(set(briefs).issubset(slugs))

    def test_topic_specific_cta(self):
        self.brief["cta_headline"] = "맞춤 박스 제작 상담"
        self.assertFalse(self.result(self.text)[0])
        self.assertTrue(self.result(self.text.replace('headline="제작 상담"',
                                                    'headline="맞춤 박스 제작 상담"'))[0])

    def test_audience_prompt_keeps_metrics_private(self):
        context = generator.load_editorial_context()
        self.assertEqual(set(context), {"audience_intents", "business_facts", "writing_rules", "exclusions"})
        prompt = generator.build_system_prompt([])
        self.assertIn("맞춤 사이즈 박스", prompt)
        self.assertIn("다양한 목적의 분전반", prompt)
        for private_metric in ("610", "194", "91.39", "44.76", "1.03"):
            self.assertNotIn(private_metric, prompt)

    def test_prepared_topics_bridge_to_actual_business(self):
        queue, briefs = generator.load_queue(), generator.load_briefs()
        prepared = [t for t in queue["topics"] if t["slug"] in briefs]
        self.assertEqual(len(prepared), 12)
        self.assertEqual(sum(t["intent"] == "informational" for t in prepared), 8)
        self.assertEqual(sum(t["intent"] == "commercial" for t in prepared), 4)
        self.assertEqual(prepared[0]["slug"], "breaker-rating-cable-order")
        self.assertEqual(prepared[2]["slug"], "custom-box-size-order")
        for topic in prepared:
            brief = briefs[topic["slug"]]
            self.assertTrue(brief["business_bridge"])
            self.assertTrue(brief["cta_headline"])
            prompt = generator.build_user_prompt(topic, brief)
            embedded = prompt.split("검토된 근거 브리프:\n", 1)[1].split("\n\nfacts만", 1)[0]
            self.assertEqual(generator.yaml.safe_load(embedded)["business_bridge"],
                             brief["business_bridge"])

    def test_prompt_has_no_magic_ranking_claim(self):
        prompt = generator.build_system_prompt([])
        self.assertNotIn("134-167", prompt)
        self.assertNotIn("인용에 최적", prompt)
        self.assertIn("검색·AI 인용 순위나 유입 증가를 보장하지 않는다", prompt)


if __name__ == "__main__":
    unittest.main()

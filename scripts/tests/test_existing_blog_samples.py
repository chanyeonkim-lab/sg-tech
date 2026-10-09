"""Regression checks for the three search-intent refreshes, without paid generation."""
import datetime
import pathlib
import re
import unittest

import yaml

ROOT = pathlib.Path(__file__).parents[2]
SAMPLES = {
    "2026-08-31-mccb-vs-elb-difference": {
        "keyword": "배선용차단기",
        "sources": {
            "https://www.electrical-installation.org/enwiki/Standards_and_description_of_circuit-breakers",
            "https://eshop.se.com/in/blog/post/rccb-working-principles-benefits.html",
            "https://www.electrical-installation.org/enwiki/Types_of_RCDs",
        },
    },
    "2026-08-31-af-at-ka-explained": {
        "keyword": "AF",
        "sources": {
            "https://www.electrical-installation.org/enwiki/Fundamental_characteristics_of_a_circuit-breaker",
            "https://www.electrical-installation.org/enwiki/Other_characteristics_of_a_circuit-breaker",
            "https://www.se.com/ca/en/faqs/FA173244/",
        },
    },
    "2026-08-31-ip-rating-outdoor-panel": {
        "keyword": "IP55",
        "sources": {
            "https://www.rittal.com/uk-en/service/Technical-Information/Protection-categories",
            "https://www.rittal.com/us-en_US/products/Tips-and-Tricks",
            "https://www.rittal.com/com-en/blog/moisture-in-enclosures",
            "https://blog.se.com/infrastructure-and-grid/power-management-metering-monitoring-power-quality/2017/01/03/designing-building-electrical-panel-part-3-internal-external-equipment-layout-installation/",
        },
    },
}


class ExistingArticleRefresh(unittest.TestCase):
    def test_dates_urls_and_search_intent(self):
        for slug, config in SAMPLES.items():
            with self.subTest(slug=slug):
                text = (ROOT / "content/blog" / f"{slug}.mdx").read_text(encoding="utf-8")
                _, frontmatter, body = text.split("---", 2)
                data = yaml.safe_load(frontmatter)
                self.assertEqual(str(data["date"]), "2026-08-31")
                self.assertGreaterEqual(data["updated"], datetime.date(2026, 10, 9))
                self.assertFalse(data["draft"])
                self.assertEqual(data.get("category", "blog"), "blog")
                self.assertNotIn("slug", data)
                self.assertIn(config["keyword"], data["title"])
                intro = body.split("\n## ", 1)[0]
                self.assertIn(config["keyword"], intro)
                self.assertNotIn("<ContactCta", intro)

    def test_sources_faqs_and_links(self):
        for slug, config in SAMPLES.items():
            with self.subTest(slug=slug):
                text = (ROOT / "content/blog" / f"{slug}.mdx").read_text(encoding="utf-8")
                self.assertEqual(text.count("<ContactCta"), 1)
                faq = text.split("## 자주 묻는 질문\n", 1)[1].split("<ContactCta", 1)[0]
                self.assertEqual(len(re.findall(r"^Q\. ", faq, re.MULTILINE)), 4)
                self.assertEqual(len(re.findall(r"^A\. ", faq, re.MULTILINE)), 4)
                self.assertIn("## 참고 자료", text)
                self.assertIn("## 다음 읽을거리", text)
                links = set(re.findall(r"(?<!!)\[[^\]]+\]\(([^\s)]+)\)", text))
                self.assertEqual({url for url in links if url.startswith("https://")}, config["sources"])
                for url in links:
                    if url.startswith(("/blog/", "/portfolio/")):
                        path = "blog" if url.startswith("/blog/") else "cases"
                        self.assertTrue((ROOT / "content" / path / f"{url.rsplit('/', 1)[1]}.mdx").is_file())

    def test_style_and_unverified_claims(self):
        for slug in SAMPLES:
            with self.subTest(slug=slug):
                text = (ROOT / "content/blog" / f"{slug}.mdx").read_text(encoding="utf-8")
                for prohibited in ("**", "—", "IP66",
                                   "사진에서 확인", "자료에 기재", "30mA / 0.03", "20년 이상",
                                   "25~50kA", "최소 등급 원칙", "예외 없이"):
                    self.assertNotIn(prohibited, text)
                self.assertIn("에스지기전", text)
                self.assertIn("맞춤", text)


if __name__ == "__main__":
    unittest.main()

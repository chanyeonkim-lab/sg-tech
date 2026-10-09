"""Content regression checks; technical evidence is separately reviewed."""
import pathlib
import re
import unittest

import yaml

ROOT = pathlib.Path(__file__).parents[2]
SLUGS = (
    "2026-10-09-wire-ampacity-table",
    "2026-10-09-breaker-rating-cable-order",
    "2026-10-09-pe-conductor-kec-size",
)


class NewWireGuides(unittest.TestCase):
    def test_publishing_structure(self):
        for slug in SLUGS:
            with self.subTest(slug=slug):
                text = (ROOT / "content/blog" / f"{slug}.mdx").read_text()
                _, frontmatter, body = text.split("---", 2)
                meta = yaml.safe_load(frontmatter)
                self.assertEqual(str(meta["date"]), "2026-10-09")
                self.assertFalse(meta["draft"])
                self.assertNotIn("**", text)
                self.assertNotIn("—", text)
                self.assertEqual(text.count("<ContactCta"), 1)
                self.assertNotIn("<ContactCta", body.split("\n## ", 1)[0])
                faq = body.split("## 자주 묻는 질문", 1)[1].split("<ContactCta", 1)[0]
                self.assertEqual(len(re.findall(r"^Q\. ", faq, re.M)), 4)
                self.assertEqual(len(re.findall(r"^A\. ", faq, re.M)), 4)
                self.assertIn("## 참고 자료", body)
                self.assertIn("## 다음 읽을거리", body)
                self.assertIn("에스지기전", body)
                for target in re.findall(r"\]\(/blog/([^\s)]+)\)", body):
                    self.assertTrue((ROOT / "content/blog" / f"{target}.mdx").exists())

    def test_conditioned_numeric_examples(self):
        table = (ROOT / "content/blog" / f"{SLUGS[0]}.mdx").read_text()
        for row in (
            "| 2.5mm² | 21A | 20A | 24A |",
            "| 4mm² | 28A | 27A | 32A |",
            "| 6mm² | 36A | 34A | 41A |",
            "| 10mm² | 50A | 46A | 57A |",
            "| 16mm² | 68A | 62A | 76A |",
        ):
            self.assertIn(row, table)
        for condition in ("PVC", "70℃", "3개", "30℃", "보정 적용 전", "참고 자료"):
            self.assertIn(condition, table)
        breaker = (ROOT / "content/blog" / f"{SLUGS[1]}.mdx").read_text()
        for condition in ("I_B ≤ I_n ≤ I_Z", "I₂ ≤ 1.45 × I_Z", "34A × 0.87 = 29.58A", "통전도체 3개"):
            self.assertIn(condition, breaker)

    def test_pe_scope_and_evidence(self):
        text = (ROOT / "content/blog" / f"{SLUGS[2]}.mdx").read_text()
        for condition in ("142.3.2", "142.3.1", "표 142.3-1", "재질이 같은", "5초 이하", "기계적", "PEN", "TT계통", "경과조치"):
            self.assertIn(condition, text)
        for row in ("| 25mm² | 16mm² |", "| 50mm² | 25mm² |", "| 70mm² | 35mm² |"):
            self.assertIn(row, text)
        evidence = yaml.safe_load((ROOT / "content/blog/_manual-evidence.yaml").read_text())
        self.assertEqual(set(evidence["articles"]), set(SLUGS))
        queue = yaml.safe_load((ROOT / "content/blog/_queue.yaml").read_text())
        topic = next(t for t in queue["topics"] if t["slug"] == "breaker-rating-cable-order")
        self.assertEqual(topic["status"], "done")
        self.assertEqual(topic["published_slug"], SLUGS[1])


if __name__ == "__main__":
    unittest.main()

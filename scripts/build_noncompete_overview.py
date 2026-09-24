"""Render a public overview SVG from aggregate non-compete dashboard data."""

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / "src/data/noncompete.json").read_text(encoding="utf-8"))
output = ROOT / "public/images/noncompete-10k-overview.svg"


def txt(x, y, value, size=22, color="#1e2a43", weight=500, family="Arial, sans-serif", extra=""):
    return f'<text x="{x}" y="{y}" fill="{color}" font-family="{family}" font-size="{size}" font-weight="{weight}" {extra}>{html.escape(str(value))}</text>'


parts = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc">',
    '<title id="title">Non-Compete 10-K Coding Dashboard overview</title>',
    '<desc id="desc">Aggregate preview with 130 sampled filing snippets, 1262 annotation rows, a filing year timeline, annotation coverage bars, and Type themes.</desc>',
    '<rect width="1600" height="900" fill="#f5f6fa"/>',
    '<rect x="35" y="30" width="1530" height="210" rx="20" fill="#14223e"/>',
    '<circle cx="1453" cy="131" r="95" fill="#26395e" stroke="#92d9d2" stroke-width="2"/>',
    '<circle cx="1453" cy="131" r="72" fill="none" stroke="#7285b3" stroke-width="2"/>',
    txt(78, 75, "RESEARCH VISUALIZATION  /  10-K ANNOTATIONS", 17, "#a8dfd6", 800, extra='letter-spacing="3"'),
    txt(78, 148, "Non-Compete 10-K", 55, "#ffffff", 700, "Georgia, serif"),
    txt(78, 207, "Coding Dashboard", 53, "#d7c8f1", 400, "Georgia, serif"),
    txt(1453, 141, "130", 59, "#ffffff", 700, "Georgia, serif", 'text-anchor="middle"'),
    txt(1453, 169, "filing snippets", 16, "#d5efe9", 700, extra='text-anchor="middle"'),
]

cards = [
    ("FILING SNIPPETS", str(data["meta"]["filings"])),
    ("ANNOTATION ROWS", f'{data["meta"]["annotationRows"]:,}'),
    ("WITH TYPE LABEL", str(data["meta"]["typeAnnotatedFilings"])),
    ("FILING YEARS", f'{data["meta"]["firstYear"]}–{data["meta"]["lastYear"]}'),
]
for i, (label, value) in enumerate(cards):
    x = 35 + i * 388
    parts.extend([
        f'<rect x="{x}" y="263" width="367" height="125" rx="12" fill="#fff" stroke="#e0e4ed"/>',
        txt(x + 24, 300, label, 15, "#6e788b", 800, extra='letter-spacing="2"'),
        txt(x + 24, 363, value, 43 if i < 3 else 36, "#6b50b1", 700, "Georgia, serif"),
    ])

parts.extend([
    '<rect x="35" y="411" width="943" height="435" rx="14" fill="#fff" stroke="#e0e4ed"/>',
    '<rect x="997" y="411" width="568" height="435" rx="14" fill="#fff" stroke="#e0e4ed"/>',
    txt(65, 453, "01 / SAMPLE TIMELINE", 15, "#755ab9", 800, extra='letter-spacing="2"'),
    txt(65, 494, "Filing snippets by year", 29, "#1e2a43", 700, "Georgia, serif"),
    txt(1027, 453, "02 / ANNOTATION COVERAGE", 15, "#755ab9", 800, extra='letter-spacing="2"'),
    txt(1027, 494, "Features recorded", 29, "#1e2a43", 700, "Georgia, serif"),
])

annual = data["annual"]
chart_x, chart_y, chart_width, chart_height = 77, 774, 846, 223
for tick in (0, 5, 10, 15):
    y = chart_y - tick / 15 * chart_height
    parts.extend([f'<line x1="{chart_x}" y1="{y:.1f}" x2="{chart_x + chart_width}" y2="{y:.1f}" stroke="#e5e8f0"/>', txt(67, y + 5, tick, 14, "#8590a1", 500, extra='text-anchor="end"')])
step = chart_width / len(annual)
for index, row in enumerate(annual):
    height = row["filings"] / 15 * chart_height
    x = chart_x + step * index + 3
    y = chart_y - height
    parts.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{step - 6:.1f}" height="{height:.1f}" rx="2" fill="#7a5dbd"/>')
    if index % 5 == 0 or index == len(annual) - 1:
        parts.append(txt(x + (step - 6) / 2, 807, row["year"], 14, "#647084", extra='text-anchor="middle"'))

for i, feature in enumerate(data["features"][:6]):
    y = 531 + i * 46
    pct = feature["filings"] / data["meta"]["filings"] * 100
    parts.extend([
        txt(1027, y, feature["name"], 17, "#26334f", 700),
        f'<rect x="1200" y="{y - 15}" width="250" height="15" rx="7" fill="#eeeaf5"/>',
        f'<rect x="1200" y="{y - 15}" width="{pct * 2.5:.1f}" height="15" rx="7" fill="#8669c8"/>',
        txt(1519, y, feature["filings"], 18, "#26334f", 800, extra='text-anchor="end"'),
    ])
parts.extend([
    txt(1027, 834, "Overlapping labels  •  Descriptive sample", 15, "#788396", 600),
    txt(40, 883, "Aggregate preview only. Raw filing passages, identifiers, and research comments are excluded.", 15, "#768194"),
    "</svg>",
])
output.write_text("\n".join(parts), encoding="utf-8")
print(output)

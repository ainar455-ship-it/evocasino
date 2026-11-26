import os, re, sys
from html.parser import HTMLParser
from collections import defaultdict, Counter

OUT_DIR = "out"

HUB = "/evolution-casinos"
METH = "/how-we-rank"

GUIDE_PREFIX = "/guides/"
CASINO_PREFIX = "/casinos/"

def norm_path(p: str) -> str:
  if not p:
    return ""
  p = p.strip()
  p = p.split("#", 1)[0].split("?", 1)[0]
  if not p:
    return ""
  if p.startswith(("http://", "https://", "mailto:", "tel:")):
    return ""
  if not p.startswith("/"):
    return ""
  if p != "/" and p.endswith("/"):
    p = p[:-1]
  return p or "/"

class LinkParser(HTMLParser):
  def __init__(self):
    super().__init__()
    self.links = []  # (href, anchorText)
    self._in_a = False
    self._a_href = None
    self._a_text = []

  def handle_starttag(self, tag, attrs):
    if tag.lower() == "a":
      href = None
      for k, v in attrs:
        if k.lower() == "href":
          href = v
          break
      self._in_a = True
      self._a_href = href
      self._a_text = []

  def handle_endtag(self, tag):
    if tag.lower() == "a" and self._in_a:
      text = " ".join("".join(self._a_text).split())
      self.links.append((self._a_href, text))
      self._in_a = False
      self._a_href = None
      self._a_text = []

  def handle_data(self, data):
    if self._in_a and data:
      self._a_text.append(data)

def file_to_route(filepath: str) -> str:
  rel = os.path.relpath(filepath, OUT_DIR).replace("\\", "/")
  if rel == "index.html":
    return "/"
  if rel.endswith(".html") or rel.endswith(".txt"):
    rel = rel.rsplit(".", 1)[0]
  if rel.endswith("/index"):
    rel = rel[:-6]
  if not rel.startswith("/"):
    rel = "/" + rel
  if rel != "/" and rel.endswith("/"):
    rel = rel[:-1]
  return rel

# Regex for RSC .txt payloads: `"href":"/path"`
HREF_RE = re.compile(r'"href":"(\/[^"]+)"')

def parse_links_from_txt(text: str):
  # returns list of (href, "")
  out = []
  for m in HREF_RE.finditer(text):
    out.append((m.group(1), ""))  # no anchor text available reliably in RSC
  return out

def main():
  if not os.path.isdir(OUT_DIR):
    print(f"❌ Missing ./{OUT_DIR} folder. Build/export first.")
    sys.exit(1)

  files = []
  for root, _, fs in os.walk(OUT_DIR):
    for f in fs:
      if f.endswith(".html") or f.endswith(".txt"):
        files.append(os.path.join(root, f))

  if not files:
    print("❌ No .html/.txt files found in out/.")
    sys.exit(1)

  # Prefer .txt over .html for link extraction if both exist for same route
  route_best = {}
  for fp in files:
    r = file_to_route(fp)
    ext = os.path.splitext(fp)[1]
    score = 2 if ext == ".txt" else 1
    if r not in route_best or score > route_best[r][0]:
      route_best[r] = (score, fp)

  routes = sorted(route_best.keys())

  out_edges = defaultdict(set)
  in_edges = defaultdict(set)
  guide_anchor_texts = Counter()
  hub_to_guides = set()

  for route, (_, fp) in route_best.items():
    ext = os.path.splitext(fp)[1]
    with open(fp, "r", encoding="utf-8", errors="ignore") as f:
      content = f.read()

    links = []
    if ext == ".html":
      parser = LinkParser()
      parser.feed(content)
      links = parser.links
    else:
      links = parse_links_from_txt(content)

    for href, text in links:
      p = norm_path(href or "")
      if not p:
        continue
      out_edges[route].add(p)
      in_edges[p].add(route)

      if p.startswith(GUIDE_PREFIX):
        if text:
          guide_anchor_texts[text] += 1
        if route == HUB:
          hub_to_guides.add(p)

  orphans = [r for r in routes if r != "/" and len(in_edges.get(r, set())) == 0]
  print("\n== Orphan pages (no inbound internal links) ==")
  if orphans:
    for r in orphans:
      print("ORPHAN:", r)
  else:
    print("✅ None")

  guides = [r for r in routes if r.startswith(GUIDE_PREFIX)]
  print("\n== Guides missing required links (hub + methodology) ==")
  bad = 0
  for g in guides:
    edges = out_edges.get(g, set())
    missing = []
    if HUB not in edges:
      missing.append(HUB)
    if METH not in edges:
      missing.append(METH)
    if missing:
      bad += 1
      print("MISSING:", g, "->", ", ".join(missing))
  if bad == 0:
    print("✅ All guides link to hub + methodology")

  print("\n== Hub -> Guides ==")
  if not guides:
    print("⚠️ No guides found under /guides/*")
  else:
    missing_from_hub = sorted(set(guides) - set(hub_to_guides))
    if missing_from_hub:
      print("⚠️ Hub is missing links to these guides:")
      for g in missing_from_hub:
        print("HUB MISSING:", g)
    else:
      print("✅ Hub links to all guides")

  casino_pages = [r for r in routes if r.startswith(CASINO_PREFIX)]
  print("\n== Casino review pages with NO /guides/ links (sanity flag) ==")
  no_guide_links = []
  for c in casino_pages:
    edges = out_edges.get(c, set())
    if not any(e.startswith(GUIDE_PREFIX) for e in edges):
      no_guide_links.append(c)
  if no_guide_links:
    for c in no_guide_links[:50]:
      print("NO GUIDES:", c)
    if len(no_guide_links) > 50:
      print(f"... +{len(no_guide_links)-50} more")
    print("⚠️ Not strictly an error: requires your 'where relevant' rules. But this flags candidates.")
  else:
    print("✅ All casino pages link to at least one guide")

  print("\n== Anchor texts used for /guides/* links (top 25) ==")
  if guide_anchor_texts:
    for txt, n in guide_anchor_texts.most_common(25):
      print(f"{n:>4}  {txt}")
  else:
    print("(No anchor text captured — expected when reading RSC .txt payloads)")

  print("\n== Guide-link anchor texts missing 'Evolution' (soft warning) ==")
  if not guide_anchor_texts:
    print("✅ Skipped (no anchor text available from RSC payload).")
  else:
    warned = 0
    for txt, n in guide_anchor_texts.items():
      if "evolution" not in txt.lower():
        warned += 1
        print(f"{n:>4}  {txt}")
    if warned == 0:
      print("✅ All guide-link anchors contain 'Evolution'")
    else:
      print("⚠️ Stylistic consistency check only.")

if __name__ == "__main__":
  main()

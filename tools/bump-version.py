#!/usr/bin/env python3
"""Bump the site build id.

Usage:
    python tools/bump-version.py 2026.11.16.1

Updates data-build in every HTML file, the ?v= asset query, build.json,
and the service worker's BUILD constant.
"""

from __future__ import annotations

import json
import re
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PATTERN = re.compile(r"^[0-9A-Za-z._-]+$")


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python tools/bump-version.py <version>")
        return 1

    version = sys.argv[1].strip()
    if not PATTERN.fullmatch(version):
        print("Version may only contain letters, numbers, dots, underscores, and hyphens.")
        return 1

    changed = 0
    for path in ROOT.rglob("*.html"):
        original = path.read_text(encoding="utf-8")
        updated = re.sub(r'data-build="[^"]*"', f'data-build="{version}"', original)
        updated = re.sub(r'\?v=[^"&]*', f"?v={version}", updated)
        if updated != original:
            path.write_text(updated, encoding="utf-8", newline="\n")
            changed += 1
            print(f"updated {path.relative_to(ROOT)}")

    build_path = ROOT / "build.json"
    build = json.loads(build_path.read_text(encoding="utf-8"))
    build["version"] = version
    build["builtAt"] = datetime.now().astimezone().isoformat(timespec="seconds")
    build_path.write_text(
        json.dumps(build, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    sw_path = ROOT / "sw.js"
    sw = sw_path.read_text(encoding="utf-8")
    sw = re.sub(r'const BUILD = "[^"]*";', f'const BUILD = "{version}";', sw)
    sw_path.write_text(sw, encoding="utf-8")

    print()
    print(f"Build id: {version}")
    print(f"HTML files changed: {changed}")
    print("Next: commit, push, and let GitHub Pages deploy.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env python3
"""Stamp index.html's data scripts and logo images with a short content hash (?v=...),
so browsers load fresh copies as soon as a file changes. Run after rebuilding data."""
import hashlib, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = os.path.join(ROOT, 'index.html'); s = open(p, encoding='utf-8').read()
v = lambda f: hashlib.md5(open(os.path.join(ROOT, f), 'rb').read()).hexdigest()[:8]
s, a = re.subn(r'<script src="(data/[a-z0-9_]+\.js)(?:\?v=[0-9a-f]+)?"></script>', lambda m: f'<script src="{m.group(1)}?v={v(m.group(1))}"></script>', s)
s, b = re.subn(r"'(img/[a-z]+-logo\.(?:svg|png|webp|jpg))(?:\?v=[0-9a-f]+)?'", lambda m: f"'{m.group(1)}?v={v(m.group(1))}'", s)
open(p, 'w', encoding='utf-8').write(s); print(f'cache tags: {a} data files, {b} logos')

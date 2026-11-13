#!/usr/bin/env python3
"""Build a single-file snapshot of the World Report as it stands now.

Usage: python3 tools/snapshot.py [output.html]

Inlines every data/*.js script and every img/ file into one HTML file that
opens offline by double-clicking. Used before the world clock moves to a new
week, so Sean keeps a copy of each week's site on his computer.
Default output: snapshots/TNM World Report - week of <WORLD_DATE>.html
"""
import base64, mimetypes, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def main():
    html = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    world = open(os.path.join(ROOT, 'data', 'world.js'), encoding='utf-8').read()
    date = re.search(r'const WORLD_DATE = "([^"]+)"', world).group(1)

    def inline_script(m):
        path = os.path.join(ROOT, m.group(1))
        code = open(path, encoding='utf-8').read().replace('</script', '<\\/script')
        return '<script>\n' + code + '\n</script>'
    html = re.sub(r'<script src="(data/[^"]+\.js)"></script>', inline_script, html)

    def inline_img(m):
        path = os.path.join(ROOT, m.group(1))
        if not os.path.exists(path):
            return m.group(0)
        mime = mimetypes.guess_type(path)[0] or 'image/webp'
        return 'data:%s;base64,%s' % (mime, base64.b64encode(open(path, 'rb').read()).decode())
    html = re.sub(r'(img/[A-Za-z0-9_.-]+)', inline_img, html)

    stamp = ('<!-- TNM World Wrestling Report snapshot: world date %s. '
             'Archive links point at the live promotion sites. -->\n' % date)
    html = html.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n' + stamp, 1) if html.startswith('<!DOCTYPE') else stamp + html

    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
        ROOT, 'snapshots', 'TNM World Report - week of %s.html' % date)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(html)
    print(out)

if __name__ == '__main__':
    main()

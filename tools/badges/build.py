"""Section badges for the Show Archive tabs: the promotion's logo over a label,
on black, in the style of img/wcwhouse-logo.png. Run from the repo root:
  python3 tools/badges/build.py
Writes img/<name>-logo.png. Add each to SITES.<key>.icons with ?v=<hash>."""
from PIL import Image, ImageDraw, ImageFont
ANTON = '/usr/share/fonts/truetype/google-fonts/ofl/anton/Anton-Regular.ttf'
W, H = 400, 234

def badge(out, logo, lines, fill, shadow, logo_h=110):
    im = Image.new('RGB', (W, H), (0, 0, 0))
    lg = Image.open(logo).convert('RGBA')
    s = logo_h / lg.height; lg = lg.resize((round(lg.width * s), logo_h), Image.LANCZOS)
    if lg.width > W - 30:
        s = (W - 30) / lg.width; lg = lg.resize((W - 30, round(lg.height * s)), Image.LANCZOS)
    top = 10; im.paste(lg, ((W - lg.width) // 2, top), lg)
    d = ImageDraw.Draw(im); y0 = top + lg.height + 6; room = H - y0 - 8
    lh = room / len(lines)
    for i, t in enumerate(lines):
        size = int(lh * 1.05)
        while True:
            f = ImageFont.truetype(ANTON, size); bb = d.textbbox((0, 0), t, font=f)
            if bb[2] - bb[0] <= W - 24 and bb[3] - bb[1] <= lh - 2: break
            size -= 1
        x = (W - (bb[2] - bb[0])) // 2 - bb[0]; y = y0 + i * lh + (lh - (bb[3] - bb[1])) / 2 - bb[1]
        d.text((x + 4, y + 4), t, font=f, fill=shadow)
        d.text((x, y), t, font=f, fill=fill)
    im.save(out, optimize=True)

GOLD, WWFBLUE = (230, 178, 38), (30, 70, 160)
badge('img/wwfhouse-logo.png', 'img/wwf-logo.webp', ['HOUSE SHOW'], GOLD, WWFBLUE)
RED, WHITE, BLUE = (200, 30, 40), (245, 245, 245), (30, 55, 140)
U = 'img/uswa-logo.png'
badge('img/uswachamp-logo.png', U, ['CHAMPIONSHIP TV'], WHITE, RED, 80)
badge('img/uswaww-logo.png', U, ['WORLDWIDE'], WHITE, BLUE, 80)
badge('img/uswappv-logo.png', U, ['PAY-PER-VIEW'], RED, BLUE, 80)
badge('img/uswaspecial-logo.png', U, ['SUPERCARDS', '& SPECIALS'], WHITE, RED, 70)
badge('img/uswahouse-logo.png', U, ['HOUSE SHOW'], RED, BLUE, 80)
print('ok')
badge('img/wwfppv-logo.png', 'img/wwf-logo.webp', ['PAY-PER-VIEW'], GOLD, WWFBLUE)
WCWGOLD, WCWPURPLE = (214, 166, 46), (60, 55, 150)
badge('img/wcwppv-logo.png', 'img/wcw-logo.png', ['PAY-PER-VIEW'], WCWGOLD, WCWPURPLE)
badge('img/wwfchall-logo.png', 'img/wwf-logo.webp', ['WRESTLING', 'CHALLENGE'], GOLD, WWFBLUE, 100)

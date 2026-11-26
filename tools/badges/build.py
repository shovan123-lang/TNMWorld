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

def star(d, cx, cy, r, fill, outline=None):
    import math
    pts = [(cx + (r if i % 2 == 0 else r * .42) * math.cos(math.radians(-90 + 36 * i)),
            cy + (r if i % 2 == 0 else r * .42) * math.sin(math.radians(-90 + 36 * i))) for i in range(10)]
    d.polygon(pts, fill=fill, outline=outline)

def starwars(out):
    """USWA Star Wars 1991 show logo: original design (USWA logo, red, white and blue
    lettering, stars). Transparent, for use next to the show in the archive."""
    W2, H2 = 300, 270
    im = Image.new('RGBA', (W2, H2), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    NAVY = (24, 40, 110, 255)
    d.rounded_rectangle((4, 4, W2 - 4, H2 - 4), 22, fill=NAVY, outline=(200, 30, 40, 255), width=6)
    d.rounded_rectangle((14, 14, W2 - 14, H2 - 14), 16, outline=(245, 245, 245, 255), width=2)
    lg = Image.open('img/uswa-logo.png').convert('RGBA'); s = 52 / lg.height
    lg = lg.resize((round(lg.width * s), 52), Image.LANCZOS); im.alpha_composite(lg, ((W2 - lg.width) // 2, 26))
    def text(t, y, size, fill, shadow, maxw=W2 - 40):
        while True:
            f = ImageFont.truetype(ANTON, size); bb = d.textbbox((0, 0), t, font=f)
            if bb[2] - bb[0] <= maxw: break
            size -= 2
        x = (W2 - (bb[2] - bb[0])) // 2 - bb[0]
        d.text((x + 4, y + 4 - bb[1]), t, font=f, fill=shadow)
        d.text((x, y - bb[1]), t, font=f, fill=fill, stroke_width=0)
        return bb[3] - bb[1]
    h = text('STAR WARS', 92, 78, (245, 245, 245, 255), (200, 30, 40, 255))
    text('1991', 92 + h + 14, 52, (230, 40, 50, 255), (0, 0, 0, 160), maxw=120)
    for cx in (62, W2 - 62): star(d, cx, 92 + h + 40, 17, (245, 245, 245, 255))
    star(d, 34, 50, 10, (200, 30, 40, 255)); star(d, W2 - 34, 50, 10, (200, 30, 40, 255))
    im.save(out, optimize=True)

starwars('img/uswastarwars-logo.png')

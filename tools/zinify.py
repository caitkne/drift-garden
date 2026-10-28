"""Turn a photo into a photocopied zine picture: a 1-bit halftone, or a hard photocopy.
Usage: python3 tools/zinify.py in.jpg out.png [--copy] [--width 900] [--cell 7]
The result is black ink on white, meant to sit on coloured paper with mix-blend-mode: multiply."""
import sys, math, random
from PIL import Image, ImageOps, ImageFilter, ImageDraw, ImageEnhance

def halftone(img, width, cell, angle=45, lift=.7):
    g = ImageOps.grayscale(img)
    g = g.resize((width, round(g.height * width / g.width)), Image.LANCZOS)
    g = ImageOps.autocontrast(g, cutoff=2)
    g = ImageEnhance.Contrast(g).enhance(1.15)
    g = g.point(lambda v: round(255 * (v / 255) ** lift))
    # work rotated so the dot screen sits at an angle, like a print
    big = g.rotate(angle, expand=True, fillcolor=255)
    W, H = big.size
    out = Image.new('L', (W, H), 255); d = ImageDraw.Draw(out)
    px = big.load()
    for y in range(0, H, cell):
        for x in range(0, W, cell):
            vals = [px[min(W - 1, x + i), min(H - 1, y + j)] for i in range(0, cell, 2) for j in range(0, cell, 2)]
            dark = 1 - sum(vals) / len(vals) / 255
            if dark < .04: continue
            r = cell * .55 * math.sqrt(dark) * (1 + random.uniform(-.08, .08))
            cx, cy = x + cell / 2, y + cell / 2
            d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=0)
    out = out.rotate(-angle, expand=True, fillcolor=255)
    ox, oy = (out.width - g.width) // 2, (out.height - g.height) // 2
    return out.crop((ox, oy, ox + g.width, oy + g.height))

def photocopy(img, width):
    g = ImageOps.grayscale(img)
    g = g.resize((width, round(g.height * width / g.width)), Image.LANCZOS)
    g = ImageOps.autocontrast(g, cutoff=3)
    noise = Image.effect_noise(g.size, 38)
    g = Image.blend(g, noise, .16).filter(ImageFilter.GaussianBlur(.7))
    return g.point(lambda v: 0 if v < 118 else 255)

def toner(im):
    """photocopier grit: a few specks and streaks of stray toner"""
    d = ImageDraw.Draw(im); W, H = im.size
    for _ in range(W * H // 9000):
        x, y = random.randrange(W), random.randrange(H); r = random.choice([.6, .8, 1.2, 1.6])
        d.ellipse((x - r, y - r, x + r, y + r), fill=0)
    return im

if __name__ == '__main__':
    a = sys.argv[1:]; src, dst = a[0], a[1]
    width = int(a[a.index('--width') + 1]) if '--width' in a else 900
    cell = int(a[a.index("--cell") + 1]) if "--cell" in a else 5
    img = Image.open(src).convert('RGB')
    out = photocopy(img, width) if '--copy' in a else halftone(img, width, cell)
    out = toner(out.convert('L')).convert('1', dither=Image.NONE)
    out.save(dst, optimize=True)

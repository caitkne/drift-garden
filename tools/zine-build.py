"""Rebuild the homepage's zine pictures from assets/zine/src (see assets/zine/CREDITS.md).
Usage: python3 tools/zine-build.py [outdir]"""
import sys, os, random
sys.path.insert(0, os.path.dirname(__file__))
import zinify
from PIL import Image

S = 'assets/zine/src/'
O = sys.argv[1] if len(sys.argv) > 1 else 'assets/zine/'
# name: (source, crop box or None, 'ht' halftone | 'copy' photocopy, width, cell)
JOBS = {
    'lashes': ('eye-lashes', (150, 0, 1280, 1792), 'ht', 700, 6),
    'lash-strip': ('eye-lashes', (300, 400, 1150, 720), 'ht', 700, 5),
    'haircut': ('haircut-1966', (420, 420, 1040, 1237), 'ht', 560, 5),
    'model': ('model-check-dress-1971', (150, 0, 760, 1705), 'ht', 460, 4),
    'porthole': ('mod-porthole', (160, 180, 1100, 1120), 'ht', 360, 4),
    'wig': ('mod-wig', (330, 300, 1180, 1150), 'ht', 360, 4),
    'rings': ('hands-rings', (300, 350, 1000, 846), 'ht', 360, 4),
    'profile': ('profile-hands', (250, 0, 1150, 849), 'ht', 520, 5),
    'dancers': ('dancers-1968', (40, 180, 1060, 760), 'ht', 900, 6),
    'crowd': ('festival-kralingen-1970', (0, 120, 1280, 836), 'ht', 1100, 6),
    'hippies': ('hippies-amsterdam', (0, 250, 1280, 1280), 'ht', 700, 6),
    'providence': ('eye-of-providence', None, 'copy', 560, 0),
    'radiant': ('radiant-star', (150, 80, 1150, 760), 'copy', 640, 0),
    'heavens': ('stars-heavens', (200, 150, 1100, 920), 'copy', 600, 0),
    'lac': ('bon-ton-lac-de-come', (120, 120, 720, 1060), 'ht', 460, 4),
    'marnac': ('bon-ton-marnac', (110, 60, 520, 1000), 'ht', 380, 4),
    # odd company for the fashion pictures
    'astronaut': ('astronaut', (0, 0, 512, 512), 'htl', 420, 4),
    'horse': ('horse', None, 'copy', 300, 0),
    'cat-eyes': ('cat', (60, 40, 440, 160), 'htl', 420, 4),
    'coffee': ('coffee', (190, 0, 560, 330), 'htl', 340, 4),
    'deep-field': ('deep-field', None, 'inv', 700, 5),
    'retina': ('retina', None, 'ht', 560, 5),
    'hopper': ('grace-hopper', (60, 30, 480, 600), 'htl', 380, 4),
}
for k, (src, box, mode, w, cell) in JOBS.items():
    random.seed(k)
    im = Image.open(S + src + '.jpg').convert('RGB')
    if box: im = im.crop(box)
    if mode == 'inv':  # night sky: galaxies become ink specks on paper
        from PIL import ImageOps
        im = ImageOps.invert(im); mode = 'copy'
    out = zinify.photocopy(im, w) if mode == 'copy' else zinify.halftone(im, w, cell, lift=.45 if mode == 'htl' else .7)
    ink = zinify.toner(out.convert('L')).point(lambda v: 0 if v < 128 else 255)
    # ink only: black where printed, see-through paper, so CSS can mask it into any colour
    pal = Image.new('P', ink.size); pal.putpalette([0, 0, 0, 255, 255, 255]); pal.putdata([0 if v == 0 else 1 for v in ink.get_flattened_data()])
    pal.save(O + 'z-' + k + '.png', optimize=True, transparency=1)
    print(k, out.size)

# a galloping pair for the frieze: the horse and its mirror image
from PIL import ImageOps
h = Image.open(O + 'z-horse.png').convert('L'); W, H = h.size; pad = 40
pair = Image.new('L', (2 * W + 2 * pad, H), 255); pair.paste(h, (pad // 2, 0)); pair.paste(ImageOps.mirror(h), (W + pad + pad // 2, 0))
pal = Image.new('P', pair.size); pal.putpalette([0, 0, 0, 255, 255, 255]); pal.putdata([0 if v < 128 else 1 for v in pair.getdata()])
pal.save(O + 'z-horse-pair.png', optimize=True, transparency=1)

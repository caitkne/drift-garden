# Drift Garden

A garden to wander. Drop in pictures and words and they land wherever they like on a big field, lining up with their neighbours. Every piece is printed in its own pair of acid candy inks that drift apart as you move.

## Planting webpages

- Paste a link into the **Link** box, or paste or drop a link anywhere on the garden. The title, summary and picture are filled in for you (looked up with [Microlink](https://microlink.io), free for about 50 links a day).
- Drag **✿ Plant in Drift** from the plant sheet to your bookmarks bar, then press it on any page. It brings the page's title, picture and any text you've selected.
- On Android, install the garden (browser menu, then "Add to home screen") and it appears in the Share menu.

## Print runs

The whole garden is printed in one trio of inks, taken from a word you choose (top-right corner). The word is searched on Wikimedia Commons and the Art Institute of Chicago, and only pictures with the word in their title are kept (up to 16). Every pixel is sorted into a colour bin (8 lightness steps, 24 hues, 4 strengths, greys by lightness), and each picture counts equally. Pixels near the centre count more, and a plain white, grey or black backdrop is set aside. Greys and whites are left out of the running, and the coloured bins are gathered into 12 hue families, so a red spread across many shades still counts as one red. Ink A is the most common family. Ink B is the next most common one that's clearly different, nudged up to 0.1 toward A's lightness. The anchor is the most common colour that reads on both at 4.5:1, or the darkest or lightest one pushed until it does (lifting A and B slightly if nothing else works). The sheet shows the pictures, the colour counts, and each step. Tick **Push the colours brighter** to keep the hues but lift both inks into the acid band (lightness 0.6 to 0.8, as strong as a screen can show); the print run remembers the choice. If no pictures can be found, the older letter rules decide instead: hue from the letters' balance point on the wheel, gap from the vowels, and so on.

## Wildflowers

Every third thing you plant (or whenever you press **✿ Wildflower**), the garden takes words from two things you've planted and searches open collections for them:

- [Art Institute of Chicago API](https://api.artic.edu/docs/) (public-domain artworks)
- [The Met Collection API](https://metmuseum.github.io/)
- [Wikipedia](https://www.mediawiki.org/wiki/API:Main_page) and [Wikimedia Commons](https://commons.wikimedia.org)
- [Cleveland Museum of Art Open Access](https://openaccess-api.clevelandart.org/)
- [V&A Collections](https://developers.vam.ac.uk/)
- [Open Library](https://openlibrary.org/developers/api)
- [Internet Archive](https://archive.org/advancedsearch.php)

Sources take turns: one that has already given lots of wildflowers is less likely to go first, and one that fails is tried last.

It plants one result as a card, with its picture, and links to the source. To keep a wildflower you give it a label, and each label becomes a **bed**. Most new wildflowers grow for a bed (bigger beds more often): the bed's label is always one of the search words, paired with something you planted (or a word from the bed's wildflowers), the sources the bed already holds are tried first, and the new one sprouts beside the bed. Kept wildflowers drift over to join their bed. Pull one up and it goes on the **weed pile**: it never sprouts again, results that share its words are passed over, and its source grows less often. You can forgive a weed from the pile. If those can't be reached, it picks from a small hand-gathered seed bank of articles from culture, film, literature, museum and archive sites.

No AI runs anywhere in the garden. Matching is plain keyword search.

### Loves and echoes

**Loves** (top left) is a list you can dump favourites into, one per line. About one wildflower in four brings a love back: an exact match when a source has one (its title carries the whole phrase), otherwise the closest thing found. Loves that have come back less often are tried first.

Now and then (about 1 in 7, once you've planted six or more things), a wildflower is an **echo**: a very close match to one of the first third of things you planted. The planting itself never comes back, and if nothing close enough turns up, an ordinary wildflower grows instead.

## The studio

Every piece is set in one layout from a small type specimen. Words: roman, drop cap, staircase (one word per step), folio (running head up the edge), masthead (ruled and centred), big numeral, ranged right, pull quote (the note takes the stage), two columns. Pictures: caption below, caption over, numbered plate, side by side, full bleed. Each piece only gets layouts that suit it (a staircase needs a short title, a pull quote needs a short note, and so on).

While **Studio on** (top left), the studio re-sets one piece you can see every 6 to 12 seconds, with a small proof mark saying what it tried. It only re-sets a piece if the new layout still fits in its spot, so nothing gets shoved about. Open a piece and **Pin it** to keep a layout; layouts you pin get tried more often. Studio off keeps everything still (it starts off for people who ask their device for reduced motion).

### Its own style

The studio has one more layout: **its own style**. A picture lends its own colours, counted the same way. A webpage lends the colours of its main picture and its heading font. If the page uses a Google font, that exact font is used. Licensed fonts can't be copied, so a free font of the same kind stands in (Jost for geometric sans like Futura, Inter Tight for grotesques like Helvetica, EB Garamond or Playfair for serifs, and so on), and the piece says what it's standing in for. New pieces start in their own style. The webpage lookup uses Microlink, which allows about 50 lookups a day.

## Fonts

Titles are set in Blush TM (`fonts/blush.woff2`). The print run sheet can also try a font file from your own device, kept in that browser only.

## Running it

It's a single `index.html` with no build step. Open it in a browser, or serve the folder with any static host. It's published with GitHub Pages from the `main` branch.

For now, what you plant is saved in your browser only.

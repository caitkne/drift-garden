# Drift Garden

A garden to wander. Drop in pictures and words and they land wherever they like on a big field, lining up with their neighbours. Every piece is printed in its own pair of acid candy inks that drift apart as you move.

## Planting webpages

- Paste a link into the **Link** box, or paste or drop a link anywhere on the garden. The title, summary and picture are filled in for you (looked up with [Microlink](https://microlink.io), free for about 50 links a day).
- Drag **✿ Plant in Drift** from the plant sheet to your bookmarks bar, then press it on any page. It brings the page's title, picture and any text you've selected.
- On Android, install the garden (browser menu, then "Add to home screen") and it appears in the Share menu.

## Print runs

The whole garden is printed in one acid trio, worked out from a word you choose (top-right corner). Each step is shown when you type the word: the letters' balance point on the colour wheel sets the hue, the share of vowels sets how far apart the two inks sit, and the length sets light or deep inks.

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

## Fonts

Titles are set in Blush TM (`fonts/blush.woff2`). The print run sheet can also try a font file from your own device, kept in that browser only.

## Running it

It's a single `index.html` with no build step. Open it in a browser, or serve the folder with any static host. It's published with GitHub Pages from the `main` branch.

For now, what you plant is saved in your browser only.

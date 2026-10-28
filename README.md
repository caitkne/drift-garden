# Drift Garden

A garden to wander. Drop in pictures and words and they land wherever they like on a big field, lining up with their neighbours. Every piece is printed in its own pair of acid candy inks that drift apart as you move.

## Planting webpages

- Paste a link into the **Link** box, or paste or drop a link anywhere on the garden. The title, summary and picture are filled in for you (looked up with [Microlink](https://microlink.io), free for about 50 links a day).
- Drag **✿ Plant in Drift** from the plant sheet to your bookmarks bar, then press it on any page. It brings the page's title, picture and any text you've selected.
- On Android, install the garden (browser menu, then "Add to home screen") and it appears in the Share menu.

## Naming your garden

Press the garden's name (top left) to rename it. The new name goes on the masthead and the browser tab, and is kept in this browser.

## Players

Paste a Spotify, YouTube, Vimeo, SoundCloud, Bandcamp or Apple Music link, or its embed code, into the Link field (or anywhere on the garden). It becomes a piece with the player inside, so it plays right there. Only the player's address is kept, and only from those sites, so pasted code can't run anything else. The studio leaves players alone, because re-setting one would stop the music.

Songs also grow as wildflowers. Apple's open song search (no key) finds songs matching your words; the one that grows becomes a Spotify player when song.link can match it, otherwise an Apple Music player. Logged out, both play 30-second previews.

## Print runs

The whole garden is printed in one trio of inks, taken from a word you choose (top-right corner). The word is searched on Wikimedia Commons and the Art Institute of Chicago, and only pictures with the word in their title are kept (up to 16). Every pixel is sorted into a colour bin (8 lightness steps, 24 hues, 4 strengths, greys by lightness), and each picture counts equally. Pixels near the centre count more, and a plain white, grey or black backdrop is set aside. Greys and whites are left out of the running, and the coloured bins are gathered into 12 hue families, so a red spread across many shades still counts as one red. Ink A is the most common family. Ink B is the next most common one that's clearly different, nudged up to 0.1 toward A's lightness. The anchor is the most common colour that reads on both at 4.5:1, or the darkest or lightest one pushed until it does (lifting A and B slightly if nothing else works). The sheet shows the pictures, the colour counts, and each step. The **True to Acid** slider keeps the hues but moves both inks part or all of the way into the acid band (lightness 0.6 to 0.8, as strong as a screen can show); the print run remembers the setting. Or drop, paste or choose **a picture** in the same sheet. Its colours are counted the same way, and every pair of common hue families that look clearly different becomes a pairing (up to six, the most common first), each with its own readable anchor. Untick any you don't want. The garden then uses the whole scheme: each piece keeps to one pairing, chosen by its id so it never changes. If no pictures can be found, the older letter rules decide instead: hue from the letters' balance point on the wheel, gap from the vowels, and so on.

## Wildflowers

Every third thing you plant (or whenever you press **✿ Wildflower**), the garden picks a spot, takes one word from each of the plants growing nearest it until it has 3 to 5 words, and searches open collections for that mix. If no source has anything for all of them, it lets go of the last word, down to three:

- [Art Institute of Chicago API](https://api.artic.edu/docs/) (public-domain artworks)
- [The Met Collection API](https://metmuseum.github.io/)
- [Wikipedia](https://www.mediawiki.org/wiki/API:Main_page) and [Wikimedia Commons](https://commons.wikimedia.org)
- [Cleveland Museum of Art Open Access](https://openaccess-api.clevelandart.org/)
- [V&A Collections](https://developers.vam.ac.uk/)
- [Open Library](https://openlibrary.org/developers/api)
- [Internet Archive](https://archive.org/advancedsearch.php)

Beyond the museums, wildflowers and seeds also come from Openverse (openly licensed photographs and sounds), iNaturalist (nature sightings), PoetryDB (poems), Mixcloud (DJ mixes) and Are.na. Sources are grouped into families (museums, words, books, pictures, nature, sound, shops) and each family gets an equal turn, so the four museums don't crowd out everything else.

Sources take turns: one that has already given lots of wildflowers is less likely to go first, and one that fails is tried last.

It plants one result as a card, with its picture, and links to the source. To keep a wildflower you give it a label, and each label becomes a **bed**. Most new wildflowers grow for a bed (bigger beds more often): the bed's label is always one of the search words, paired with something you planted (or a word from the bed's wildflowers), the sources the bed already holds are tried first, and the new one sprouts beside the bed. Kept wildflowers drift over to join their bed. Pull one up and it goes on the **weed pile**: it never sprouts again, results that share its words are passed over, and its source grows less often. You can forgive a weed from the pile. If those can't be reached, it picks from a small hand-gathered seed bank of articles from culture, film, literature, museum and archive sites.

No AI runs anywhere in the garden. Matching is plain keyword search.

### Seed kit

A new garden opens with its **seed kit** (top left): things you love, one per line. **Scatter seeds** grows three to five of them at random. Each seed grows a surprise: something one source turned up for it, picked at random from what it found, never just the word. Tap a single seed to grow that one. Grown seeds are marked in the kit and count as things you planted, so they feed the wildflowers around them.

## The studio

Every piece is set in one layout from a small type specimen. Words: roman, drop cap, staircase (one word per step), folio (running head up the edge), masthead (ruled and centred), big numeral, ranged right, pull quote (the note takes the stage), two columns. Pictures: caption below, caption over, numbered plate, side by side, full bleed. Each piece only gets layouts that suit it (a staircase needs a short title, a pull quote needs a short note, and so on).

While **Studio on** (top left), the studio re-sets one piece you can see every 6 to 12 seconds, with a small proof mark saying what it tried. It only re-sets a piece if the new layout still fits in its spot, so nothing gets shoved about. Open a piece and **Pin it** to keep a layout; layouts you pin get tried more often. Studio off keeps everything still (it starts off for people who ask their device for reduced motion).

### Its own style

The studio has one more layout: **its own style**. A picture lends its own colours, counted the same way. A webpage lends the colours of its main picture and its heading font. If the page uses a Google font, that exact font is used. Licensed fonts can't be copied, so a free font of the same kind stands in (Jost for geometric sans like Futura, Inter Tight for grotesques like Helvetica, EB Garamond or Playfair for serifs, and so on), and the piece says what it's standing in for. New pieces start in their own style. The webpage lookup uses Microlink, which allows about 50 lookups a day.

## eBay wildflowers

eBay listings grow as wildflowers through the garden's eBay relay (a small free Cloudflare Worker that keeps the eBay key private). Setup steps are in [worker/README.md](worker/README.md). Until its address is set in `EBAY_RELAY`, there are no eBay wildflowers.

## Fonts

**Display font** (in the Print run sheet) offers 57 free Google Fonts chosen by one test: would it sit on an A24 title card? Grouped as hairline and haunted, strange serifs, gothic edge, signal and static, and speed and drift. The previews only load the letters they show. The chosen font is sized automatically to match the house font's width, and is kept in this browser.


Titles are set in Blush TM (`fonts/blush.woff2`). The print run sheet can also try a font file from your own device, kept in that browser only.

## Running it

It's a single `index.html` with no build step. Open it in a browser, or serve the folder with any static host. It's published with GitHub Pages from the `main` branch.

For now, what you plant is saved in your browser only.

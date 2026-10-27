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
- [Wikipedia](https://www.mediawiki.org/wiki/API:Main_page)

It plants one result as a card, with its picture, and links to the source. Keep a wildflower and its words and source become likelier next time. Pull one up and they become less likely. If those can't be reached, it picks from a small hand-gathered seed bank of articles from culture, film, literature, museum and archive sites.

No AI runs anywhere in the garden. Matching is plain keyword search.

## Running it

It's a single `index.html` with no build step. Open it in a browser, or serve the folder with any static host. It's published with GitHub Pages from the `main` branch.

For now, what you plant is saved in your browser only.

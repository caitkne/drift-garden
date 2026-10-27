# Drift Garden

A garden to wander. Drop in pictures and words and they land wherever they like on a big field, lining up with their neighbours. Every piece is printed in its own pair of acid candy inks that drift apart as you move.

## Wildflowers

Every third thing you plant (or whenever you press **✿ Wildflower**), the garden takes words from two things you've planted and searches open collections for them:

- [Art Institute of Chicago API](https://api.artic.edu/docs/) (public-domain artworks)
- [The Met Collection API](https://metmuseum.github.io/)
- [Wikipedia](https://www.mediawiki.org/wiki/API:Main_page)

It plants one result as a card, with its picture, and links to the source. If those can't be reached, it picks from a small hand-gathered seed bank of articles from culture, film, literature, museum and archive sites.

No AI runs anywhere in the garden. Matching is plain keyword search.

## Running it

It's a single `index.html` with no build step. Open it in a browser, or serve the folder with any static host. It's published with GitHub Pages from the `main` branch.

For now, what you plant is saved in your browser only.

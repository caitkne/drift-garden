# eBay relay

eBay listings can grow as wildflowers, but eBay only answers searches made with a private key. That key can't sit in the garden's public page, so this small Cloudflare Worker holds it and passes back just the listing titles, prices, pictures and links. It only answers requests from the garden, keeps each search for 6 hours, and stores nothing about anyone.

## Setting it up (about 10 minutes, free)

1. **Cloudflare.** Sign up at dash.cloudflare.com (the free plan is plenty). Go to **Workers & Pages**, press **Create**, then **Create Worker**. Name it `drift-ebay` and press **Deploy**.
2. **The code.** Press **Edit code**, delete what's there, paste in everything from `ebay-relay.js`, and press **Deploy**.
3. **Your eBay keys.** At developer.ebay.com, open **Application Keys** and use the **Production** keyset. Back in Cloudflare, open the worker's **Settings → Variables and Secrets** and add two **Secrets**:
   - `EBAY_CLIENT_ID`: your App ID (Client ID)
   - `EBAY_CLIENT_SECRET`: your Cert ID (Client Secret)

   Keep these out of chats and files. They only go into Cloudflare's secret store.
4. **eBay's account-deletion notice.** eBay may keep a Production keyset switched off until you deal with "Marketplace account deletion" notifications. In the developer portal under **Alerts & Notifications**, choose to opt out (be exempted), because this relay doesn't store any eBay user data.
5. **Optional.** Add a plain-text variable `MARKETPLACE` if you'd rather see a different eBay site (the default is `EBAY_AU`, the closest to New Zealand; `EBAY_GB` and `EBAY_US` also work).
6. **Tell Claude the worker's address**, which looks like `https://drift-ebay.your-name.workers.dev`. That address isn't secret. It goes into the garden's `EBAY_RELAY` setting, and eBay listings start sprouting.

To check it's working, visit the worker address with `?q=moth` on the end. It should say `not allowed`. That's right: it only answers the garden.

# Garden accounts (garden keys, saved gardens, allotments)

A second worker holds accounts and saved gardens, so you can keep your garden in your account, plant it in an **allotment** (a garden space shared with friends) and take **cuttings** from theirs. People sign in with a name (unique, case-insensitive) and a password of 8+ characters. Passwords are stored only as PBKDF2-SHA256 hashes with a random salt, and ten wrong tries in ten minutes pause sign-ins from that address. No emails are stored, so there's no reset: a forgotten password locks the account. Older passkey or garden-key accounts still work and can set a password from the account sheet. Allotments are invite-only: a member makes a link, it works for a week and for up to ten people, and the keeper can remove anyone (their gardens leave with them). A garden is only visible to you and to members of allotments you've planted it in.

## Setting it up (about 10 minutes, free)

1. **A database.** In Cloudflare, go to **Storage & Databases → D1 SQL Database**, press **Create**, and name it `drift-garden`. (The tables make themselves the first time the worker runs.)
2. **Somewhere for gardens.** Go to **Storage & Databases → KV**, press **Create**, and name it `drift-gardens`.
3. **The worker.** **Workers & Pages → Create → Create Worker**, name it `drift-garden-api`, press **Deploy**, then **Edit code**. Delete what's there, paste in everything from `garden-api.js` (it's long, that's fine), and press **Deploy**.
4. **Connect them.** In the worker's **Settings → Bindings**, add:
   - a **D1 database** binding named `DB`, pointing to `drift-garden`
   - a **KV namespace** binding named `GARDENS`, pointing to `drift-gardens`
5. **Tell Claude the worker's address** (`https://drift-garden-api.your-name.workers.dev`). It goes into the garden's `GARDEN_API` setting and a **Sign in** button appears at the top.

No secrets are needed for this one. Visiting the address in a browser tab says `not allowed`, which is right: it only answers the garden.

`garden-api.js` is built from `garden/api.js` (run `npm install` then `npm run build` in `worker/garden`). It uses the SimpleWebAuthn library to check passkeys for older accounts, and `garden/words.js` (the EFF large wordlist, CC BY 3.0, eff.org/dice) for garden keys.

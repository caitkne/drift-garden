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

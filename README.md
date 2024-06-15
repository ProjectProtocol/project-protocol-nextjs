# Project Protocol in NextJS

Porting to Nextjs in a way that makes it worthwhile requires an overhaul of the architecture of the original SPA vitejs app. Some of the key concepts are:

- Maximizing the use of server components so that pages are prebuilt and cached for the best site performance.
- Judicious use of client components to minimize how much code needs to be sent to the browser.
- Strongly rooting everything in hierarchy to take advantage of streaming and dynamic rendering to the browser.

## Auth plan of attach

Should be doable with NextAuth library.

- LOGIN REQUEST:

  - Browser -> Nextjs server -> Rails
    - Failure -> Nextjs Server -> return error to browser
    - Success -> Nextjs Server -> set jwt as session token in browser

- AUTHENTICATED REQUEST

  - Browser -> (Nextjs Middleware -> Server action) -> Rails
  - Check age of session token. If older than X days, reauthenticate and update session token in browser (middleware)
  - Send API request through with AUTHORIZATION => "Bearer <token>" header

- LOGOUT REQUEST

  - Browser -> Nextjs Server -> Rails
    - Failure -> token must have been invalid. Gracefully catch and log errors.
    - Success or Failure -> destroy browser session token

- Protected pages
  - How to get auth status for redirects and UI updates?

TODO:

- [ ] Error boundaries/page
- [ ] Loading bar / pushing down data requests
- [x] Translations - switched to crowdin and next-intl
- [ ] Profile Page
- [ ] Rate my PO
- [ ] Resources
- [ ] Better font handling (get rid of cdn link in sass) + typography for contentful pages

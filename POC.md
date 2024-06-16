# ProPro + Nextjs Proof of Concept

The [proof-of-concept](https://github.com/ProjectProtocol/project-protocol-nextjs/tree/proof-of-concept) branch is from an initial pass at implementing the Project Protocol web app in nextjs. I've separated it to rebuild more cleanly on the `main` branch so we can start building it out in earnest in a more methodical way.

This branch is a bit chaotic but it has useful proofs of concept for:

1. Translations provided by next-intl (TODO: add script that converts tolgee format to next-intl flat files)
2. Authentication flow
3. Adding our custom bootstrap style library
4. Conversion of a number of key components to be nextjs and server-component friendly
5. Implementation of contentful content pulling.

Some goals for the rebuild:

1. Further think about and streamline how authentication works between Browser -> Nextjs server -> API.
2. Make nextjs api endpoints in a more idiomatic way for server actions and data fetching.
3. Reduce api abstraction and just use fetch as needed for calling the rails api.
4. More methodically and incrementally import components from the existing app.
5. Optimize contentful pages so they can be rendered server side (research nextjs + contentful). The tricky part here will be providing both English and Spanish.

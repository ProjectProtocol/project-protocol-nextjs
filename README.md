# Project Protocol in NextJS

Porting the project protocol client to Nextjs for SEO, page performance, static rendering, server-side components, image optimization and more ✨.

## Running locally

1. Set up environment
   Run:

   ```shell
   touch .env.local
   echo "AUTH_SECRET=$(openssl rand -base64 32)" >> .env.local
   echo "API_URL=http://localhost:3000" >> .env.local
   ```

2. Add `TOLGEE_ACCESS_TOKEN` to .env.local

   ```shell
   ...
   TOLGEE_ACCESS_TOKEN=<your tolgee api key>
   ```

3. Install dependencies
   Run:

   ```shell
   pnpm i
   ```

4. Start dev server
   Run:
   ```shell
   pnpm dev
   ```

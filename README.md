## Local Development

Install the project's dependencies:

```
npm install
```

If you want to run the interactive .env encryption flow during install, set:

```
ENV_ENCRYPTION_PROMPT=true npm install
```

Run the project locally:

```
npm run dev
```

Build for production:

```
npm run build
```

Configure Cloudflare Turnstile (anti-spam):

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key
```

If you need Tina Cloud validation during build/start, use:

```
npm run build:tina
npm run start:tina
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

TODO

- allow submissions for other website via env variable name

# Qrati Connect — Astro Example

[![Qrati Connect — embeddable event photo galleries](public/qrati-connect-og.png)](https://qrati.com/connect)

Add a live event photo gallery to Astro sites with guest uploads, lightbox viewing, emoji reactions, and contest leaderboards. [Explore Qrati Connect](https://qrati.com/connect) or [view the live Astro example](https://qrati.com/connect/astro-example).

An [Astro](https://astro.build) example that embeds [Qrati Connect](https://qrati.com)
using the no-code **embed script**, with a host-controlled light/dark theme
and an immediately rendered widget. The demo org is also
configured for custom storage on the Qrati backend — that's a server-side
setting with no frontend impact.

## Integration method: Embed script

A single `async` script tag mounts the widget where it sits; config travels in
`data-*` attributes:

```html
<script async
  src="https://cdn.jsdelivr.net/npm/@qratilabs/qrati-connect/embed/embed.js"
  data-organization-id="your-org-id"
  data-router="hash"></script>
```

The Astro page renders a `<qrati-connect>` custom element directly and loads
the embed script once. It passes the organization ID and synchronizes the theme;
it does not currently configure a user identity.

## Run it

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Open **http://localhost:4321** to view the demo.

## Other integration methods

- **React component** — `import { QratiConnect }` (see the React / Next / Preact examples).
- **Web component** — `<qrati-connect>` from the CDN (see the Svelte / Solid / Qwik / Lit examples).

Docs: <https://www.npmjs.com/package/@qratilabs/qrati-connect>

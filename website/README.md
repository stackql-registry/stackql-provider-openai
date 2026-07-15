# Website

The documentation microsite for the `openai` StackQL provider, served at
[openai-provider.stackql.io](https://openai-provider.stackql.io). Built with
[Docusaurus](https://docusaurus.io/) 3.10.

> Provider generation (fetch, split, mappings, normalize, generate, test, publish)
> is documented in the [repository root README](../README.md). This README covers
> the website only. The service docs under `docs/` are generated from the provider
> output - do not edit them by hand.

## Shared configuration

Navbar, footer, theme and plugin configuration is shared across the StackQL
provider microsites via [`stackql/docusaurus-config`](https://github.com/stackql/docusaurus-config),
vendored into `.shared-config/` at build time. The `vendor-config` script runs
automatically before `start` and `build` (it clones the shared config, so network
access to GitHub is required). Site-local files are `provider.js` (the provider
identity), the thin `docusaurus.config.js` / `sidebars.js` wrappers, the
components/theme under `src/`, and the assets under `static/`.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

Starts a local dev server and opens a browser window. Most changes are reflected
live without restarting the server.

## Build

```bash
yarn build
```

Generates static content into the `build` directory, servable by any static host.

```bash
yarn serve
```

Serves the built `build` directory locally to verify the production build.

## Deployment

The site deploys to `openai-provider.stackql.io` via **GitHub Pages**, driven by
the GitHub Actions workflow `.github/workflows/prod-web-deploy.yml` (on push to
`main` touching `website/**`): it runs `yarn build` (which vendors the shared
config), then publishes `website/build` with `actions/deploy-pages`. Pull requests
run `.github/workflows/test-web-deploy.yml` as a build check. `static/CNAME` pins
the custom domain and `static/.nojekyll` lets GitHub Pages serve Docusaurus's
underscore-prefixed asset paths.

import {themes as prismThemes} from 'prism-react-renderer';
import { createConfig } from './.shared-config/index.js';
import { providerName, providerTitle } from './provider.js';

const config = createConfig({
  providerName,
  providerTitle,
  prismThemes,
  overrides: {
    future: {
      v4: true,
      faster: true,
    },
  },
});

// This provider's website lives at website/ within the canonical
// stackql-registry/stackql-provider-openai repo, so the "Edit this page" links
// point at that subdirectory (the shared config default omits the website/ path).
config.projectName = 'stackql-provider-openai';
config.presets[0][1].docs.editUrl =
  'https://github.com/stackql-registry/stackql-provider-openai/edit/main/website/';

// Use the locally vendored registry-branded logos (STACKQL>> | REGISTRY) instead
// of the shared config's hotlinked main-site wordmark - self-contained assets, no
// cross-origin fetch. global.css swaps in the -mobile variants below 996px.
const registryLogo = {
  alt: 'StackQL',
  href: '/',
  src: 'img/stackql-registry-logo.svg',
  srcDark: 'img/stackql-registry-logo-white.svg',
};
config.themeConfig.navbar.logo = { ...registryLogo };
config.themeConfig.footer.logo = { ...registryLogo };

export default config;

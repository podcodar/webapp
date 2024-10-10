import { defineConfigWithTheme } from 'vitepress'
import type { ThemeConfig } from "vitepress-carbon"
import { carbonConfig } from './theme/config'

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  extends: carbonConfig,
  title: "PodCodar Engineering Wiki",
  description: "Engineering documentation for PodCodar Developers",

  srcDir: "src",
  base: "/webapp/",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "VitePress", link: "/vitepress" },
    ],

    search: {
      provider: "local",
    },

    sidebar: [
      {
        text: "Vitepress Examples",
        link: "/vitepress/",
        items: [
          { text: "Markdown Examples", link: "/vitepress/markdown-examples" },
          { text: "Runtime API Examples", link: "/vitepress/api-examples" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/podcodar/webapp/",
      },
    ],
  },
})

import { defineConfigWithTheme } from 'vitepress'

import { withMermaid } from "vitepress-plugin-mermaid";
import type { ThemeConfig } from "vitepress-carbon"

import { carbonConfig } from './theme/config'
// https://vitepress.dev/reference/site-config
let config = defineConfigWithTheme<ThemeConfig>({
  extends: carbonConfig,
  title: "PodCodar Engineering Wiki",
  description: "Engineering documentation for PodCodar Developers",

  srcDir: "src",
  base: "/webapp/",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Team Guidelines", link: "/guidelines" },
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
      {
        text: "Guidelines",
        link: "/guidelines/",
        items: [
          { text: "Code Standards", link: "/guidelines/code-standards" },
          { text: "Git Workflow", link: "/guidelines/git-workflow" },
          { text: "Pull Request Guidelines", link: "/guidelines/pull-request-guidelines" },
          { text: "Code Review Guidelines", link: "/guidelines/code-review-guidelines" },
        ],
      }
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/podcodar/webapp/",
      },
    ],
  },
})

config = withMermaid(config)

export default config

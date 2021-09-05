const withYaml = require('next-plugin-yaml');

const { i18n } = require('./next-i18next.config');

module.exports = withYaml({
  i18n,
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'packages'],
  },
});

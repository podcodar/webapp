const withYaml = require('next-plugin-yaml');

module.exports = withYaml({
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'packages'],
  },
});

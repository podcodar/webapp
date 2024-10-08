const withYaml = require('next-plugin-yaml');

module.exports = withYaml({
  swcMinify: true,
  reactStrictMode: true,
  env: {
    API_AUTH_TOKEN: process.env.API_AUTH_TOKEN,
  },
  eslint: {
    dirs: ['app', 'packages'], // Only run ESLint on the 'pages' and 'packages'
  },
});

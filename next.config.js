const withYaml = require('next-plugin-yaml');

module.exports = withYaml({
  swcMinify: true,
  reactStrictMode: true,
  env: {
    TURSO_CONNECTION_URL: process.env.TURSO_CONNECTION_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  },
  eslint: {
    dirs: ['app', 'packages'],
  },
});

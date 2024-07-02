const withYaml = require('next-plugin-yaml');

module.exports = withYaml({
  swcMinify: true,
  reactStrictMode: true,
  env: {
    // NOTE: this environment variables should be added with real values to .env.local
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_MESSAGING_ID: process.env.FIREBASE_MESSAGING_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    API_AUTH_TOKEN: process.env.API_AUTH_TOKEN,
  },
  eslint: {
    dirs: ['pages', 'packages'], // Only run ESLint on the 'pages' and 'packages'
  },
});

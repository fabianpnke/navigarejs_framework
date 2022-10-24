/**
 * @type {import('semantic-release').Options}
 */
const config = {
  extends: 'semantic-release-monorepo',
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/changelog',
    [
      '@semantic-release/github',
      {
        assets: [],
      },
    ],
  ],
}

module.exports = config

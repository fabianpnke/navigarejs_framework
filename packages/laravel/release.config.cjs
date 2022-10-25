/**
 * @type {import('semantic-release').Options}
 */
const config = {
  extends: 'semantic-release-monorepo',
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/exec',
      {
        verifyConditionsCmd: 'git pull',
      },
    ],
    '@semantic-release/commit-analyzer',
    '@semantic-release/changelog',
    [
      '@semantic-release/github',
      {
        assets: [],
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['packages/*/package.json', '.yarn/versions/'],
      },
    ],
  ],
}

module.exports = config

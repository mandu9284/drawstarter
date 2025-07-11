module.exports = {
  branchPrefix: 'test-renovate/',
  username: 'renovate-release',
  gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
  onboarding: false,
  platform: 'github',
  forkProcessing: 'enabled',
  repositories: ['mandu9284/drawstarter'],
  labels: ['renovatebot'],
  timezone: 'Asia/Tokyo',
  assigneesFromCodeOwners: true,
  dependencyDashboard: true,
  packageRules: [
    {
      matchUpdateTypes: ['major'],
      labels: ['renovate', 'dependencies', 'major-update'],
      automerge: false,
    },
    {
      matchUpdateTypes: ['minor', 'patch', 'pin', 'digest'],
      labels: ['renovate', 'dependencies', 'safe-update'],
      automerge: true,
    },
    {
      matchUpdateTypes: ['minor', 'patch', 'pin', 'digest'],
      matchPackagePatterns: ['eslint'],
      groupName: 'eslint',
      automerge: true,
    },
  ],
}

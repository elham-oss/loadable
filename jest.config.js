const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/documentation',
    '<rootDir>/libs/light-localize-router',
  ],
};

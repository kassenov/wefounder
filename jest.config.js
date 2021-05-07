module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.tsx?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    bail: true,
    setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/node_modules']
  };
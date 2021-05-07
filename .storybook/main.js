module.exports = {
  stories: ['../src/**/*.stories.@(tsx)'],
  addons: [],
  webpackFinal: async config => {
    return config;
  },
};

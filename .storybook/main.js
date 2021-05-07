const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

const env = dotenv.config({ path: path.resolve(`${__dirname}/../.env.test`) });

const toPath = _path => path.join(process.cwd(), '', _path);

module.exports = {
  stories: ['../src/**/*.stories.@(tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-knobs'],
  webpackFinal: async config => {
    config.plugins.push(
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'process.env': env.parsed,
        ...env.parsed,
      }),
    );

    config.resolve.alias['@emotion/core'] = toPath('node_modules/@emotion/react');
    config.resolve.alias['emotion-theming'] = toPath('node_modules/@emotion/react');

    return config;
  },
};

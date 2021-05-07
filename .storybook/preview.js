import { FullScreenContainer } from './decorators/FullScreenContainer';

window.env = process.env;

export const decorators = [FullScreenContainer];

export const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Chakra'],
    },
  },
};

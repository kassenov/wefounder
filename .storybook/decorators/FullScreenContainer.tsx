import { Story } from '@storybook/react';
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from "../../src/styles/customTheme";

const styling = {
  margin: '0 auto',
  width: '100%',
};

export function FullScreenContainer(StoryFn: Story) {
  return (
    <div style={styling}>
      <ChakraProvider theme={customTheme}>
        <StoryFn />
      </ChakraProvider>
    </div>
  );
}

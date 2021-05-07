import React, { ComponentProps } from "react";
import { Story } from "@storybook/react";
import ProgressBar from "./ProgressBar";
import { Box } from "@chakra-ui/layout";

export default {
  title: "ProgressBar",
  decorators: [
    (StoryFn, { args }) => {
      return (
        <Box maxW="md">
          <Box>
            <StoryFn {...args} />
          </Box>
        </Box>
      );
    },
  ],
};

const Template: Story<ComponentProps<typeof ProgressBar>> = (args) => (
  <Box
    bg="gray.100"
    p={4}
    borderRadius="md"
    w="500px"
  >
    <ProgressBar {...args} progress={10} />
  </Box>
);

export const Demo = Template.bind({});

Demo.args = {};

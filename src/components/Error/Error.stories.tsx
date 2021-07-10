import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Error as ErrorCmp } from './Error';

export default {
  title: 'Error',
  component: ErrorCmp,
} as ComponentMeta<typeof ErrorCmp>;

const Template: ComponentStory<typeof ErrorCmp> = (args) => (
  <ErrorCmp {...args} />
);

export const Error = Template.bind({});
Error.args = {
  message: 'Component Render Error',
};

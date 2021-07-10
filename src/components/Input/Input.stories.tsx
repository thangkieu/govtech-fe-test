import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input as TypoComp } from './Input';

export default {
  title: 'Input',
  component: TypoComp,
} as ComponentMeta<typeof TypoComp>;

const Template: ComponentStory<typeof TypoComp> = (args) => (
  <TypoComp {...args} />
);

export const Input = Template.bind({});
Input.args = {
  placeholder: 'Input control',
  block: false,
};

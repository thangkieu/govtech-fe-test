import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Typography as TypoComp } from './Typography';

export default {
  title: 'Typography',
  component: TypoComp,
} as ComponentMeta<typeof TypoComp>;

const Template: ComponentStory<typeof TypoComp> = (args) => (
  <TypoComp {...args} />
);

export const Typography = Template.bind({});
Typography.args = {
  children: 'Typography',
};

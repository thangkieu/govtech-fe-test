import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header as HeaderCmp } from './Header';
import { ExitIcon } from '../Icons';

export default {
  title: 'Header',
  component: HeaderCmp,
} as ComponentMeta<typeof HeaderCmp>;

const Template: ComponentStory<typeof HeaderCmp> = (args) => (
  <HeaderCmp {...args} />
);

export const Header = Template.bind({});
Header.args = {};

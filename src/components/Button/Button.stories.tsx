import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button as ButtonCmp } from './Button';
import { ExitIcon } from '../Icons';

export default {
  title: 'Button',
  component: ButtonCmp,
} as ComponentMeta<typeof ButtonCmp>;

const Template: ComponentStory<typeof ButtonCmp> = (args) => (
  <ButtonCmp {...args} />
);

export const Button = Template.bind({});
Button.args = {
  children: 'Button Action',
};

export const SubmitButton = Template.bind({});
SubmitButton.args = {
  children: 'Submit',
  htmlType: 'submit',
  type: 'primary',
};

export const LinkButton = Template.bind({});
LinkButton.args = {
  children: 'Link',
  type: 'link',
  to: 'https://google.com',
  icon: <ExitIcon />,
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  children: 'Disabled Button',
  disabled: true,
};

export const IconButton = Template.bind({});
IconButton.args = {
  children: 'Logout',
  icon: <ExitIcon />,
};

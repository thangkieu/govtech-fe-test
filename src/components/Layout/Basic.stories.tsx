import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LayoutBasic as Cmp } from './Basic';
import { LayoutSide as LayoutSideCmp } from './Side';
import { Typography } from '../Typography';

export default {
  title: 'Layout',
  component: Cmp,
} as ComponentMeta<typeof Cmp>;

const Template: ComponentStory<typeof Cmp> = (args) => <Cmp {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: (
    <>
      <Typography type="h1">Page title</Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dolore
        quod, saepe perspiciatis minima sequi beatae perferendis totam? Officia
        sequi ut minima esse ea blanditiis amet autem fugit fugiat ipsum.
      </Typography>
    </>
  ),
};

const SideTemplate: ComponentStory<typeof LayoutSideCmp> = (args) => (
  <LayoutSideCmp {...args} />
);

export const Side = SideTemplate.bind({});
Side.args = {
  children: (
    <>
      <Typography type="h1">Page title</Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dolore
        quod, saepe perspiciatis minima sequi beatae perferendis totam? Officia
        sequi ut minima esse ea blanditiis amet autem fugit fugiat ipsum.
      </Typography>
    </>
  ),
};

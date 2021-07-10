import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LayoutBasic as Cmp } from './Basic';
import { Typography } from '../Typography';

export default {
  title: 'Layout',
  component: Cmp,
} as ComponentMeta<typeof Cmp>;

const Template: ComponentStory<typeof Cmp> = (args) => <Cmp {...args} />;

export const LayoutBasic = Template.bind({});
LayoutBasic.args = {
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

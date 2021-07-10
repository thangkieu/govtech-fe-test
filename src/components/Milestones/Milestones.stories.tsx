import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Milestones as MilestonesCmp } from './Milestones';

export default {
  title: 'Milestones',
  component: MilestonesCmp,
} as ComponentMeta<typeof MilestonesCmp>;

const Template: ComponentStory<typeof MilestonesCmp> = (args) => (
  <MilestonesCmp {...args} />
);

export const Milestones = Template.bind({});
Milestones.args = {
  milestones: [
    {
      step: 1,
      label: 'Step 1',
    },
    {
      step: 2,
      label: 'Step 2',
    },
    {
      step: 3,
      label: 'Step 3',
    },
  ],
  activeStep: 1,
};

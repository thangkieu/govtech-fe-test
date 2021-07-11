import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AppModule as AppModuleCmp } from './AppModule';

export default {
  title: 'App Module',
  component: AppModuleCmp,
} as ComponentMeta<typeof AppModuleCmp>;

const Template: ComponentStory<typeof AppModuleCmp> = (args) => (
  <AppModuleCmp {...args} />
);

export const AppModule = Template.bind({});
AppModule.args = {
  data: {
    name: 'staff_profiles',
    title: 'Staff Profiles',
    desc: 'Use emails or employee numbers to extract staff profiles.',
    photo: 'https://picsum.photos/id/119/3264/2176',
  },
  disabled: false,
};

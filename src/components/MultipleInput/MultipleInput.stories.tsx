import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MultipleInput as TypoComp } from './MultipleInput';
import { useState } from 'react';

export default {
  title: 'Multiple Input',
  component: TypoComp,
} as ComponentMeta<typeof TypoComp>;

const Template: ComponentStory<typeof TypoComp> = (args) => {
  const [items, setItems] = useState(args.defaultItems);

  return <TypoComp {...args} defaultItems={items} onChange={setItems} />;
};

export const MultipleInput = Template.bind({});
MultipleInput.args = {
  placeholder: 'MultipleInput control',
  defaultItems: ['kqth@gmail.com', 'td@gmail.com'],
  pattern: 'email',
};

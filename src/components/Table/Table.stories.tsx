import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Table as TableCmp } from './Table';

export default {
  title: 'Table',
  component: TableCmp,
} as ComponentMeta<typeof TableCmp>;

const Template: ComponentStory<typeof TableCmp> = (args) => (
  <TableCmp {...args} />
);

export const Table = Template.bind({});
Table.args = {
  colDefs: [
    {
      field: 'column1',
      headerName: 'Column 1',
    },
    {
      field: 'column2',
      headerName: 'Column 2',
    },
    {
      field: 'column3',
      headerName: 'Column 3',
    },
  ],
  data: [
    {
      column1: 'Test',
      column2: 'Test',
      column3: 'Test',
    },
    {
      column1: 'Test',
      column2: 'Test',
      column3: 'Test',
    },
    {
      column1: 'Test',
      column2: 'Test',
      column3: 'Test',
    },
    {
      column1: 'Test',
      column2: 'Test',
      column3: 'Test',
    },
  ],
};

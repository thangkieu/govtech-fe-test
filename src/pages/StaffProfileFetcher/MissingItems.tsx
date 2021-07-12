import React, { memo } from 'react';
import { TagItem } from '../../components/TagItem';
import { Typography } from '../../components/Typography';

interface MissingItemsProps {
  data?: string[];
  label?: string;
}

export const MissingItems = memo<MissingItemsProps>(({ data, label }) => {
  if (!data || data.length === 0) return null;

  return (
    <div>
      <Typography type="h3" space="sm" weight="bold">
        {label}
      </Typography>

      {data?.map((str) => (
        <TagItem key={str} value={str} appearance="danger" />
      ))}
    </div>
  );
});

import React, { memo, FC, useCallback } from 'react';
import styled from 'styled-components';
import { CancelIcon } from '../Icons';

type Appearance = 'primary' | 'danger' | 'success';

interface TagItemProps {
  value: string;
  appearance?: Appearance;
  onRemove?(payload: string): void;
}

const ItemStyle = styled.span<Pick<TagItemProps, 'appearance'>>`
  line-height: 1.6;
  padding: 0 0.5em;
  background-color: ${(p) => p.theme.colors.tags[p.appearance || 'primary']};
  border: 1px solid ${(p) => p.theme.colors[p.appearance || 'primary']};
  border-radius: 4px;
  margin: 0 0.5em 0.5em 0;
  display: inline-flex;
  align-items: center;

  svg {
    width: 1.4em;
    height: 1.4em;
    padding: 0.2em;
    fill: currentColor;
    margin-left: 0.3em;
    opacity: 0.6;
    transition: opacity 0.2s ease;
    cursor: pointer;
    color: #888;

    &:hover {
      opacity: 1;
    }
  }
`;

export const TagItem: FC<TagItemProps> = memo(
  ({ value, appearance, onRemove }) => {
    const handleRemove = useCallback(() => onRemove?.(value), [
      value,
      onRemove,
    ]);

    return (
      <ItemStyle appearance={appearance}>
        {value}
        {typeof onRemove === 'function' && (
          <CancelIcon data-value={value} onClick={handleRemove} />
        )}
      </ItemStyle>
    );
  }
);

TagItem.defaultProps = {
  appearance: 'primary',
};

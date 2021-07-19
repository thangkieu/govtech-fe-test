import React, { memo, FC, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { isValid, PatternType } from '../../utils/helpers';
import { TagItem } from '../TagItem';
import { ErrorMsg, Label } from '../Typography/TypoVariant';

interface InputProps {
  placeholder?: string;
  defaultItems?: string[];
  pattern?: PatternType;
  label?: string;
  onChange?(payload: string[]): void;
}

const Field = styled.div`
  margin-bottom: 1.5rem;
`;

const InputStyle = styled.div`
  padding: 0.5em 0.5em 0 0.5em;
  border: 1px solid ${(p) => p.theme.colors.border};
  outline: none;
  border-radius: 0.5em;
  display: flex;
  flex-wrap: wrap;
  min-height: 71px;
  align-items: flex-start;
  background-color: white;

  &:focus {
    border-color: ${(p) => p.theme.colors.primary};
    box-shadow: 0 0 0 2px #1890ff33;
  }
`;
const InputCursor = styled.span<Pick<InputProps, 'placeholder'>>`
  line-height: 1.3;
  padding: 0.2em 0.5em;
  outline: none;
  flex-grow: 1;
  margin-bottom: 0.5em;

  ${(p) =>
    p.placeholder &&
    css`
      position: relative;

      &:empty::before {
        content: '${p.placeholder}';
        color: #898989;
        z-index: -1;
      }
    `}
`;

export const MultipleInput: FC<InputProps> = memo(
  ({ onChange, defaultItems, pattern, label, placeholder }) => {
    const [selectedItems, setSelectedItems] = useState(defaultItems);
    const [error, setError] = useState('');

    const validateValue = useCallback(
      (value: string) => {
        if (pattern && !isValid(pattern, value)) {
          setError(`"${value}" is invalid.`);
          return false;
        }

        return true;
      },
      [pattern]
    );

    const updateItems = useCallback(
      (items) => {
        setSelectedItems(items);
        onChange?.(items);
      },
      [onChange]
    );

    const handleKeyDown: React.KeyboardEventHandler<HTMLSpanElement> = useCallback(
      (event) => {
        const value: string = event.currentTarget.textContent || '';
        if (error) setError('');

        if (
          event.key === 'Backspace' &&
          !value &&
          selectedItems &&
          selectedItems.length > 0
        ) {
          // remove latest item
          updateItems(selectedItems.slice(0, selectedItems.length - 1));

          return;
        }

        // add new item
        if (event.key !== 'Enter' && event.key !== ',') return;

        event.preventDefault();

        // validate
        if (!validateValue(value)) return;

        const newSelectedItems = selectedItems || [];

        if (newSelectedItems.indexOf(value) > -1) return;

        updateItems([...newSelectedItems, value]);

        event.currentTarget.innerHTML = '';
      },
      [selectedItems, error, validateValue, updateItems]
    );

    const handleRemove = useCallback(
      (valueToRemove: string) => {
        if (!selectedItems || selectedItems.length === 0) return;

        updateItems(selectedItems.filter((i) => i !== valueToRemove));
      },
      [updateItems, selectedItems]
    );

    return (
      <Field>
        {label && <Label>{label}</Label>}
        <InputStyle>
          {selectedItems?.map((item) => (
            <TagItem key={item} value={item} onRemove={handleRemove} />
          ))}
          <InputCursor
            placeholder={
              selectedItems && selectedItems.length > 0 ? '' : placeholder
            }
            contentEditable
            onKeyDown={handleKeyDown}
          />
        </InputStyle>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Field>
    );
  }
);

MultipleInput.defaultProps = {};

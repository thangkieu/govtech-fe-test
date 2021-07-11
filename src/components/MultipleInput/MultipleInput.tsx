import React, { memo, FC, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { isValid, PatternType } from '../../utils/helpers';
import { CancelIcon } from '../Icons';
import { ErrorMsg } from '../Typography/TypoVariant';

interface InputProps {
  placeholder?: string;
  selectedItems?: string[];
  pattern?: PatternType;
  onChange?(payload: string[]): void;
}

const InputStyle = styled.div`
  padding: 0.5em 0.5em 0 0.5em;
  border: 1px solid ${(p) => p.theme.colors.border};
  outline: none;
  border-radius: 0.5em;
  display: flex;
  flex-wrap: wrap;

  &:focus {
    border-color: ${(p) => p.theme.colors.primary};
    box-shadow: 0 0 0 2px #1890ff33;
  }
`;

const ItemStyle = styled.span`
  line-height: 1.3;
  padding: 0 0.3em 0 0.5em;
  background-color: ${(p) => p.theme.colors.primary};
  border-radius: 4px;
  color: white;
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

    &:hover {
      opacity: 1;
    }
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
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #898989;
        z-index: -1;
      }
    `}
`;

export const MultipleInput: FC<InputProps> = memo(
  ({ onChange, selectedItems, pattern, ...props }) => {
    const [error, setError] = useState('');

    const validateValue = useCallback(
      (value: string) => {
        if (pattern && !isValid(pattern, value)) {
          setError('Value is invalid');
          return false;
        }

        return true;
      },
      [pattern]
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
          onChange?.(selectedItems.slice(0, selectedItems.length - 1));

          return;
        }

        // add new item
        if (event.key !== 'Enter') return;

        event.preventDefault();

        // validate
        if (!validateValue(value)) return;

        const newSelectedItems = selectedItems || [];

        if (newSelectedItems.indexOf(value) > -1) return;

        onChange?.([...newSelectedItems, value]);

        event.currentTarget.innerHTML = '';
      },
      [selectedItems, error, validateValue, onChange]
    );

    const handleRemove: React.MouseEventHandler<SVGSVGElement> = useCallback(
      (event) => {
        const el = event.currentTarget;
        const valueToRemove = el.dataset.value;

        if (!selectedItems || selectedItems.length === 0) return;

        onChange?.(selectedItems.filter((i) => i !== valueToRemove));
      },
      [onChange, selectedItems]
    );

    return (
      <>
        <InputStyle>
          {selectedItems?.map((item) => (
            <ItemStyle key={item}>
              {item}
              <CancelIcon data-value={item} onClick={handleRemove} />
            </ItemStyle>
          ))}
          <InputCursor
            placeholder={selectedItems?.length === 0 ? props.placeholder : ''}
            contentEditable
            onKeyDown={handleKeyDown}
          />
        </InputStyle>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </>
    );
  }
);

MultipleInput.defaultProps = {};

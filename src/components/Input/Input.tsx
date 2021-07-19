import React, { memo, FC, InputHTMLAttributes } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { ErrorMsg, Label } from '../Typography/TypoVariant';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  block?: boolean;
  label?: string | React.ReactNode;
  errorMessage?: string;
}

const Field = styled.div`
  margin-bottom: 1.5rem;
`;

const InputStyle = styled.input<Pick<InputProps, 'block'>>`
  box-sizing: border-box;
  padding: 0.2em 1em;
  border: 1px solid ${(p) => p.theme.colors.border};
  outline: none;
  border-radius: 0.5em;
  line-height: 2em;
  background-color: white;

  ${(p) =>
    p.block &&
    css`
      width: 100%;
    `}

  &:focus {
    border-color: ${(p) => p.theme.colors.primary};
    box-shadow: 0 0 0 2px #1890ff33;
  }

  &:invalid {
    border-color: ${(p) => p.theme.colors.danger};
    box-shadow: 0 0 0 2px #fdc8c8;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  [type='number'] {
    -webkit-appearance: textfield;
  }
`;

export const Input: FC<InputProps> = memo(
  ({ label, block, errorMessage, ...props }) => {
    const [error, setError] = useState('');

    const handleInvalid = useCallback(() => {
      if (errorMessage) setError(errorMessage);
    }, [errorMessage]);

    const handleChange = useCallback(
      (event) => {
        if (error) setError('');

        props.onChange?.(event);
      },
      [error, props.onChange]
    );

    return (
      <Field>
        {label && <Label>{label}</Label>}
        <InputStyle
          block={block}
          {...props}
          onInvalid={handleInvalid}
          onChange={handleChange}
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Field>
    );
  }
);

Input.defaultProps = {};

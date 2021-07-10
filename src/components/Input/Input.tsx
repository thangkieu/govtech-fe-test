import React, { memo, FC, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  block?: boolean;
}

const InputStyle = styled.input<Pick<InputProps, 'block'>>`
  box-sizing: border-box;
  padding: 0.2em 1em;
  border: 1px solid ${(p) => p.theme.colors.border};
  outline: none;
  border-radius: 0.5em;
  line-height: 2em;
  ${(p) =>
    p.block &&
    css`
      width: 100%;
    `}

  &:focus {
    border-color: ${(p) => p.theme.colors.primary};
    box-shadow: 0 0 0 2px #1890ff33;
  }
`;

export const Input: FC<InputProps> = memo(({ block, ...props }) => {
  return <InputStyle block={block} {...props} />;
});

Input.defaultProps = {};

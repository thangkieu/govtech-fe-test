import React, { memo, FC } from 'react';
import styled, { css } from 'styled-components';
import { generateStyle } from './helpers';

export interface TypographyProps {
  type?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'label'
    | 'span'
    | 'strong';
  weight?: 'bold' | 'normal';
  fontStyle?: 'italic' | 'normal';
  color?: 'primary' | 'subtle' | 'normal';
  className?: string;
  appearance?: 'danger' | 'subtle' | 'success';
  space?: 'sm' | 'md' | 'lg' | 'none';
}

const TypoStyle = styled.p<
  Pick<TypographyProps, 'weight' | 'fontStyle' | 'appearance' | 'space'>
>`
  ${(p) => generateStyle(p)}
`;

export const Typography: FC<TypographyProps> = memo((props) => {
  return (
    <TypoStyle
      as={props.type}
      weight={props.weight}
      fontStyle={props.fontStyle}
      color={props.color}
      className={props.className}
      appearance={props.appearance}
      space={props.space}
    >
      {props.children}
    </TypoStyle>
  );
});

Typography.defaultProps = {
  type: 'p',
  weight: 'normal',
  fontStyle: 'normal',
};

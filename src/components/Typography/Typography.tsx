import React, { memo, FC } from 'react';
import styled, { css } from 'styled-components';

interface TypographyProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'label';
  weight?: 'bold' | 'normal';
  fontStyle?: 'italic' | 'normal';
  color?: 'primary' | 'subtle' | 'normal';
  className?: string;
}

const TypoStyle = styled.p<Pick<TypographyProps, 'weight' | 'fontStyle'>>`
  ${(p) =>
    p.weight &&
    css`
      font-weight: ${p.weight};
    `}
  ${(p) =>
    p.fontStyle &&
    css`
      font-style: ${p.fontStyle};
    `}
`;

export const Typography: FC<TypographyProps> = memo((props) => {
  return (
    <TypoStyle
      as={props.type}
      weight={props.weight}
      fontStyle={props.fontStyle}
      color={props.color}
      className={props.className}
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

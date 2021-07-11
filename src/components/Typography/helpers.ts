import { DefaultTheme, ThemedStyledProps } from 'styled-components';
import { TypographyProps } from './Typography';

export const generateStyle = (
  p: ThemedStyledProps<
    Pick<TypographyProps, 'weight' | 'fontStyle' | 'appearance' | 'space'>,
    DefaultTheme
  >
) => {
  let styleStr = '';

  if (p.weight) styleStr += `font-weight: ${p.weight};`;

  if (p.fontStyle) styleStr += `font-style: ${p.fontStyle};`;

  if (p.appearance) styleStr += `color: ${p.theme.colors[p.appearance]};`;

  switch (p.space) {
    case 'none':
      styleStr += 'margin: 0;';
      break;
    case null:
    case undefined:
      break;
    default:
      styleStr += `margin: ${p.theme.spacing[p.space]} 0`;
  }

  return styleStr;
};

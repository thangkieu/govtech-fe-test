import { memo, FC } from 'react';

import { Typography } from './Typography';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = memo((props) => (
  <Typography type="h2" space="none" className={props.className}>
    CapDev<strong>Portal</strong>
  </Typography>
));

import { memo } from 'react';
import styled from 'styled-components';
import { Typography } from './Typography';

const Style = styled(Typography)`
  margin: 0;
`;

export const ErrorMsg = memo(({ children, ...props }) => {
  return (
    <Style {...props} fontStyle="italic" appearance="danger">
      <small>{children}</small>
    </Style>
  );
});

const LabelStyle = styled(Typography)`
  margin-bottom: 0.5rem;
  display: block;
  font-size: 90%;
`;

export const Label = memo((props) => {
  return <LabelStyle {...props} type="label" appearance="subtle" />;
});

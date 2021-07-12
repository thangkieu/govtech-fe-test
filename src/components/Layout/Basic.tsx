import React, { FC, memo } from 'react';
import { Container } from '../CommonStyles';
import { Header } from '../Header';

interface LayoutProps {
  className?: string;
}
export const LayoutBasic: FC<LayoutProps> = memo((props) => {
  return (
    <main className={props.className}>
      <Header />
      <Container>{props.children}</Container>
    </main>
  );
});

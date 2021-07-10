import React, { memo } from 'react';
import styled from 'styled-components';
import { Container } from '../CommonStyles';
import { Header } from '../Header';

export const LayoutBasic = memo((props) => {
  return (
    <main>
      <Header />
      <Container>{props.children}</Container>
    </main>
  );
});

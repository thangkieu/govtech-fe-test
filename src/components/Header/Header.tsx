import React, { memo, FC } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { ExitIcon } from '../Icons';
import { Container } from '../CommonStyles';

interface HeaderProps {}

const HeaderStyle = styled.header`
  box-shadow: 0 2px 2px #ddd;
  background-color: white;
`;

const HeaderContent = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Header: FC<HeaderProps> = memo((props) => {
  return (
    <HeaderStyle>
      <HeaderContent>
        <Link to="/">Logo</Link>
        <Button icon={<ExitIcon />}>Logout</Button>
      </HeaderContent>
    </HeaderStyle>
  );
});

Header.defaultProps = {};

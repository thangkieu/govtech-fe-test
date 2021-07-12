import React, { memo, FC } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../Button';
import { ExitIcon } from '../Icons';
import { Container } from '../CommonStyles';
import { Logo } from '../Logo';
import { useCallback } from 'react';
import { logout } from '../../services/auth';

interface HeaderProps {}

const HeaderStyle = styled.header`
  box-shadow: 0 2px 2px #ddd;
  background-color: ${(p) => p.theme.colors.primary};
`;

const HeaderContent = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonStyle = styled(Button)`
  color: white;
`;

const LogoStyle = styled(Link)`
  color: white;
  text-decoration: none;
`;

export const Header: FC<HeaderProps> = memo((props) => {
  const history = useHistory();

  const handleLogout = useCallback(() => {
    logout();
    history.push('/login');
  }, [history]);

  return (
    <HeaderStyle>
      <HeaderContent>
        <LogoStyle to="/">
          <Logo />
        </LogoStyle>
        <ButtonStyle outline={false} icon={<ExitIcon />} onClick={handleLogout}>
          Logout
        </ButtonStyle>
      </HeaderContent>
    </HeaderStyle>
  );
});

Header.defaultProps = {};

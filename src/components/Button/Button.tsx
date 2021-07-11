import React, { memo, FC, ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { RefreshIcon } from '../Icons';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: string | React.ReactNode;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  type?: 'primary' | 'default' | 'link';
  to?: string;
  icon?: React.ReactNode;
  outline?: boolean;
  loading?: boolean;
}

const iconStyle = css`
  display: inline-flex;
  align-items: center;

  svg {
    font-size: 1em;
    width: 1em;
    height: auto;
    vertical-align: middle;
    margin-left: 0.5em;

    * {
      fill: currentColor;
    }
  }
`;

const ButtonStyle = styled.button<
  {
    buttonType: ButtonProps['type'];
    hasIcon?: boolean;
  } & Pick<ButtonProps, 'outline'>
>`
  border-radius: 0.5em;
  background-color: transparent;
  padding: 0.2em 1em;
  line-height: 1.6;
  cursor: pointer;
  border: 0;
  transition: all 0.3 ease;

  ${(p) =>
    p.outline &&
    css`
      border: 1px solid ${(p) => p.theme.colors.border};
    `}

  ${(p) =>
    p.buttonType === 'primary' &&
    css`
      background-color: ${(p) => p.theme.colors.primary};
      border-color: ${(p) => p.theme.colors.primary};
      color: white;
    `}

  ${(p) => p.hasIcon && iconStyle}

  &:disabled {
    background-color: ${(p) => p.theme.colors.disabled};
    border-color: ${(p) => p.theme.colors.disabled};
    color: inherit;
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const LinkStyle = styled(Link)<{ hasIcon?: boolean }>`
  display: inline-block;
  line-height: 1.6;
  background-color: transparent;
  color: ${(p) => p.theme.colors.primary};
  border-color: transparent;
  text-decoration: underline;
  text-underline-offset: 2px;

  ${(p) => p.hasIcon && iconStyle}
`;

const LoadingIcon = styled(RefreshIcon)`
  animation: spin 1.5s linear infinite;

  && {
    margin: 0 0.5em 0 0;
  }
`;

export const Button: FC<ButtonProps> = memo(
  ({ children, htmlType, type, to, icon, loading, disabled, ...props }) => {
    if (type === 'link' && to) {
      return (
        <LinkStyle to={to} hasIcon={Boolean(icon)}>
          {children}
          {icon}
        </LinkStyle>
      );
    }

    return (
      <ButtonStyle
        {...props}
        type={htmlType}
        buttonType={type}
        hasIcon={Boolean(icon) || loading}
        disabled={disabled || loading}
      >
        {loading && <LoadingIcon />}
        {children}
        {icon}
      </ButtonStyle>
    );
  }
);

Button.defaultProps = {
  outline: true,
};

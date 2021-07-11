import React, { memo, FC } from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Typography } from '../Typography';
import { Error } from '../Error';
import { useCallback } from 'react';

interface AppModuleProps {
  className?: string;
  data: AppModuleData;
  disabled?: boolean;
  defaultPhoto?: string;
}

const AppModuleStyle = styled.div<{ disabled?: boolean }>`
  background-color: white;
  box-shadow: 2px 3px 10px #ddd;
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  border: 1px solid ${(p) => p.theme.colors.border};

  ${(p) =>
    p.disabled
      ? css`
          cursor: not-allowed;
          opacity: 0.5;
          box-shadow: none;
        `
      : css`
          cursor: pointer;

          &:hover {
            box-shadow: 2px 3px 20px #b7b6b6;
          }
        `}
`;

const AppModuleContent = styled.div`
  padding: 1em;
`;

const Title = styled(Typography)`
  margin: 0;
`;

const Photo = styled.div`
  padding-bottom: 40%;
  position: relative;
  overflow: hidden;
  max-height: 300px;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
`;

export const AppModule: FC<AppModuleProps> = memo(
  ({ data, disabled, defaultPhoto, className }) => {
    const history = useHistory();

    const handleClick = useCallback(() => {
      history.push(`/apps/${data.name}`);
    }, [history, data]);

    if (!data) return <Error message="Component Render Error" />;

    return (
      <AppModuleStyle
        role="button"
        disabled={disabled}
        onClick={!disabled ? handleClick : undefined}
        className={className}
      >
        {(data.photo || defaultPhoto) && (
          <Photo>
            <img src={data.photo || defaultPhoto} alt={data.desc} />
          </Photo>
        )}
        <AppModuleContent>
          <Title type="h3" weight="bold">
            {data.title}
          </Title>
        </AppModuleContent>
      </AppModuleStyle>
    );
  }
);

AppModule.defaultProps = {
  disabled: false,
};

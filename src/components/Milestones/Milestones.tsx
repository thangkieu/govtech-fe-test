import React, { memo, FC } from 'react';
import styled from 'styled-components';
import { Typography } from '../Typography';
import { Error } from '../Error';
import { useMemo } from 'react';

type Milestone = {
  step: number;
  label: string;
};

interface MilestonesProps {
  milestones: Milestone[];
  activeStep: number;
}

const MilestonesList = styled.ul`
  padding: 0;
  margin: 0 1rem;
  display: flex;
  justify-content: center;
`;

const Dot = styled.span<{ active?: boolean }>`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
`;

const MilestoneItem = styled.li<{ active?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 1rem;

  &::after,
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 1rem;
    border-bottom: 4px solid ${(p) => p.theme.colors.primary};
    margin-top: -2px;
    width: 50%;
    z-index: -1;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  &:first-child::before,
  &:last-child::after {
    display: none;
  }

  ${Dot} {
    color: white;
    background-color: ${(p) => p.theme.colors.primary};
  }

  &.active {
    &::after,
    & ~ li::after,
    & ~ li::before {
      border-color: ${(p) => p.theme.colors.disabled};
    }

    ~ li ${Dot} {
      background-color: ${(p) => p.theme.colors.disabled};
      color: inherit;
    }
  }
`;

export const Milestones: FC<MilestonesProps> = memo(
  ({ milestones, ...props }) => {
    const activeStep = useMemo(() => Math.max(props.activeStep, 1), [
      props.activeStep,
    ]);

    if (!milestones || milestones.length === 0)
      return <Error message="Component Render Error" />;

    return (
      <MilestonesList>
        {milestones.map((item) => (
          <MilestoneItem
            key={item.step}
            active={activeStep > 1 && activeStep >= item.step}
            className={activeStep === item.step ? 'active' : ''}
          >
            <Dot active={activeStep >= item.step}>{item.step}</Dot>
            <Typography>{item.label}</Typography>
          </MilestoneItem>
        ))}
      </MilestonesList>
    );
  }
);

Milestones.defaultProps = {
  activeStep: 1,
};

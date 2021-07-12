import React, { memo } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Typography } from '../../components/Typography';

const ActionStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const RightAction = styled.div`
  text-align: right;
`;

interface StepProps {
  loading?: boolean;
  onSubmit?(email: string): void;
}

export const Step1 = memo<StepProps>(({ loading, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      onSubmit?.(email);
    },
    [email, onSubmit]
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      event.preventDefault();
      setEmail(event.currentTarget.value);
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <Typography space="md" appearance="subtle">
        Enter your Email Addess and we will send you One-Time Password (OTP) to
        enter below.
      </Typography>
      <Input
        name="email"
        placeholder="abc@example.com"
        block
        label="Email"
        onChange={handleChange}
        type="email"
        errorMessage="Email is invalid"
      />
      <ActionStyle>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={!email}
        >
          Get OTP
        </Button>
        <RightAction>
          <Typography space="none">Not a registered user yet?</Typography>
          <Button type="link" to="/contact-us">
            Contact Us.
          </Button>
        </RightAction>
      </ActionStyle>
    </form>
  );
});

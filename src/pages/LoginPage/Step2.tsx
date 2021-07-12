import React, { memo, useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Typography } from '../../components/Typography';
import { getOTP } from '../../services/auth';
import { isValid } from '../../utils/helpers';

const ActionStyle = styled.div`
  display: flex;
`;

interface StepProps {
  loading?: boolean;
  email: string;
  onSubmit?(otp: number): void;
}

export const Step2 = memo<StepProps>(({ loading, email, onSubmit }) => {
  const [otp, setEmail] = useState<number>();
  const [resending, toggleResend] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  const resendTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(
    () => () => {
      if (resendTimeoutRef.current) clearTimeout(resendTimeoutRef.current);
    },
    []
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      if (otp) onSubmit?.(otp);
    },
    [otp, onSubmit]
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      event.preventDefault();
      setEmail(parseInt(event.currentTarget.value, 10));
    },
    []
  );

  const handleResend = useCallback(async () => {
    if (!email || !isValid('email', email)) return;

    toggleResend(true);
    const resp = await getOTP(email);
    if (resp?.message) setResendStatus(resp?.message);
    resendTimeoutRef.current = setTimeout(() => void setResendStatus(''), 5000);

    toggleResend(false);
  }, [email]);

  const resendBtnLabel = useMemo(() => {
    if (resending) return 'Resending...';
    if (resendStatus) return resendStatus;

    return 'Resend OTP';
  }, [resending, resendStatus]);

  return (
    <form onSubmit={handleSubmit}>
      <Typography space="md" appearance="subtle">
        An OTP has been emailed to you. Enter OTP below.
      </Typography>

      <Input
        name="otp"
        placeholder="OTP"
        block
        label="One-Time Password"
        onChange={handleChange}
        type="number"
      />
      <ActionStyle>
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading || !otp}
          loading={loading}
        >
          Login
        </Button>
        <Button htmlType="button" outline={false} onClick={handleResend}>
          <Typography
            type="span"
            appearance={resendStatus ? 'success' : undefined}
            space="none"
          >
            {resendBtnLabel}
          </Typography>
        </Button>
      </ActionStyle>
    </form>
  );
});

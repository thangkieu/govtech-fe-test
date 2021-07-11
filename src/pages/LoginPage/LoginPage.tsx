import React, { memo } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutSide } from '../../components/Layout/Side';
import { Typography } from '../../components/Typography';
import { getOTP, login } from '../../services/auth';
import { isValid } from '../../utils/helpers';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

const SubText = styled(Typography)`
  margin-top: 0.5em;
`;

export const LoginPage = memo((props) => {
  const history = useHistory();

  const [loading, toggleLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleSubmitEmail = useCallback(async (email: string) => {
    if (!email || !isValid('email', email)) return;

    toggleLoading(true);
    await getOTP(email);

    setEmail(email);
    setStep(2);
    toggleLoading(false);
  }, []);

  const handleSubmitOtp = useCallback(
    async (otp: number) => {
      if (!email || !otp) return;

      toggleLoading(true);
      const resp = await login(email, otp);
      toggleLoading(false);

      if (resp) history.push('/');
    },
    [email, history]
  );

  return (
    <LayoutSide>
      <Typography type="h1" space="none">
        CapDev<strong>Portal</strong>
      </Typography>
      <SubText appearance="subtle" space="lg" fontStyle="italic">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </SubText>

      {step === 1 && <Step1 loading={loading} onSubmit={handleSubmitEmail} />}
      {step === 2 && (
        <Step2 loading={loading} onSubmit={handleSubmitOtp} email={email} />
      )}
    </LayoutSide>
  );
});

export default LoginPage;

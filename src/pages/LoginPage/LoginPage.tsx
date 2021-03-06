import React, { memo } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { LayoutSide } from '../../components/Layout/Side';
import { Logo } from '../../components/Logo';
import { Typography } from '../../components/Typography';
import { userInfoState } from '../../recoil-atoms/user-info';
import { getOTP, login } from '../../services/auth';
import { getUserInfo } from '../../services/profile';
import { isValid } from '../../utils/helpers';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

const SubText = styled(Typography)`
  margin-top: 0.5em;
`;

const LogoStyle = styled(Logo)`
  font-size: 3em;
`;

export const LoginPage = memo((props) => {
  const history = useHistory();

  const [loading, toggleLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const setUserInfo = useSetRecoilState(userInfoState);

  const handleSubmitEmail = useCallback(async (email: string) => {
    if (!email || !isValid('email', email)) return;

    toggleLoading(true);
    const resp = await getOTP(email);

    toggleLoading(false);

    if (!resp) return;

    setEmail(email);
    setStep(2);
  }, []);

  const handleSubmitOtp = useCallback(
    async (otp: number) => {
      if (!email || !otp) return;

      toggleLoading(true);
      const resp = await login(email, otp);
      const useInfo = await getUserInfo();
      toggleLoading(false);

      if (useInfo) setUserInfo(useInfo);
      if (resp) history.push('/');
    },
    [email, history, setUserInfo]
  );

  return (
    <LayoutSide>
      <LogoStyle />
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

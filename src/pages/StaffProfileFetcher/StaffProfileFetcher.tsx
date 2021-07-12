import React, { memo } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { STAFF_FETCHER_MILESTONES } from '../../app/constants';
import { LayoutBasic } from '../../components/Layout/Basic';
import { Milestones } from '../../components/Milestones/Milestones.stories';
import { Typography } from '../../components/Typography';
import { useRefreshToken } from '../../utils/useRefreshToken';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

export const StaffProfileFetcher = memo((props) => {
  const history = useHistory();
  const [token, refreshToken] = useRefreshToken();

  const [data, setData] = useState<StaffFetcherData>();
  const [step, setStep] = useState(1);

  const handleSubimt = useCallback(
    (payload) => {
      setData(payload);
      refreshToken();

      setStep(2);
    },
    [refreshToken]
  );

  const handleBack = useCallback(() => {
    if (step === 1) {
      history.push('/');
      return;
    }

    setStep(1);
  }, [history, step]);

  return (
    <LayoutBasic>
      <Typography type="h1" weight="bold" align="center">
        Staff Profile Fetcher
      </Typography>
      <Milestones milestones={STAFF_FETCHER_MILESTONES} activeStep={step} />
      {step === 1 && (
        <Step1
          onBack={handleBack}
          onSubmit={handleSubimt}
          defaultValue={data}
        />
      )}
      {step === 2 && data && (
        <Step2 key={token} data={data} onBack={handleBack} />
      )}
    </LayoutBasic>
  );
});

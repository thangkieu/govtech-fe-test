import React, { memo, useCallback, useState } from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { MultipleInput } from '../../components/MultipleInput';
import { Typography } from '../../components/Typography';

const ActionStyle = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface StepProps {
  onSubmit?(payload: StaffFetcherData): void;
  onBack?(): void;
  defaultValue?: StaffFetcherData;
}

export const Step1 = memo<StepProps>(({ onSubmit, onBack, defaultValue }) => {
  const [payload, setPayload] = useState<StaffFetcherData>({
    emails: defaultValue?.emails,
    emp_nums: defaultValue?.emp_nums,
  });

  const handleSubmit = useCallback(() => {
    onSubmit?.(payload);
  }, [payload, onSubmit]);

  const handleEmailsChange = useCallback(
    (emails: string[]) => {
      setPayload({ ...payload, emails });
    },
    [payload]
  );

  const handleEmployeeNumbersChange = useCallback(
    (employNums: string[]) => {
      setPayload({ ...payload, emp_nums: employNums });
    },
    [payload]
  );

  const hasData = useMemo(() => {
    return !(
      (!payload.emails || payload.emails.length === 0) &&
      (!payload.emp_nums || payload.emp_nums.length === 0)
    );
  }, [payload]);

  return (
    <div>
      <Typography space="sm" appearance="subtle" align="center">
        Enter list of emails and/or employee numbers to search.
      </Typography>
      <MultipleInput
        placeholder="Press Enter to add item..."
        label="Emails"
        onChange={handleEmailsChange}
        pattern="email"
        defaultItems={defaultValue?.emails}
      />
      <MultipleInput
        placeholder="Press Enter to add item..."
        label="Employee Numbers"
        onChange={handleEmployeeNumbersChange}
        defaultItems={defaultValue?.emp_nums}
      />
      <ActionStyle>
        <Button
          type="default"
          htmlType="button"
          outline={false}
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="primary"
          htmlType="button"
          onClick={handleSubmit}
          disabled={!hasData}
        >
          Next
        </Button>
      </ActionStyle>
    </div>
  );
});

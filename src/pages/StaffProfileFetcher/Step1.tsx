import React, { memo, useRef, useCallback } from 'react';
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
  const emailsRef = useRef<string[] | undefined>(defaultValue?.emails);
  const employeeNumbersRef = useRef<string[] | undefined>(
    defaultValue?.emp_nums
  );

  const handleSubmit = useCallback(() => {
    onSubmit?.({
      emails: emailsRef.current,
      emp_nums: employeeNumbersRef.current,
    });
  }, [onSubmit]);

  const handleEmailsChange = useCallback((payload: string[]) => {
    emailsRef.current = payload;
  }, []);

  const handleEmployeeNumbersChange = useCallback((payload: string[]) => {
    employeeNumbersRef.current = payload;
  }, []);

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
        <Button type="primary" htmlType="button" onClick={handleSubmit}>
          Next
        </Button>
      </ActionStyle>
    </div>
  );
});

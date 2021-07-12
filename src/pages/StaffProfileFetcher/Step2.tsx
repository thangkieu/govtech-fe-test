import React, { memo, useCallback, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { DownloadIcon } from '../../components/Icons';
import { Table } from '../../components/Table';
import { Typography } from '../../components/Typography';
import { postProfileRequest } from '../../services/profile';
import { MissingItems } from './MissingItems';

const ActionStyle = styled.div`
  display: flex;
  margin-top: 1em;
  justify-content: flex-end;
`;

interface StepProps {
  loading?: boolean;
  data: StaffFetcherData;
  onBack?(): void;
}

const tableColDefs = [
  {
    field: 'Display Name',
    headerName: 'Display Name',
  },
  {
    field: 'Email',
    headerName: 'Email Address',
  },
  {
    field: 'Employee Number',
    headerName: 'Employee Number',
  },
  {
    field: 'Reporting Officer',
    headerName: 'Reporting Officer',
  },
  {
    field: 'Division',
    headerName: 'Division',
  },
];

const Section = styled.section`
  margin-bottom: 2em;
`;

export const Step2 = memo<StepProps>(({ data: payload, onBack }) => {
  const [respData, setResp] = useState<FetchProfileDataResp>();
  const [downloading, toggleDownloading] = useState(false);

  const fetchData = useCallback(async () => {
    const resp: FetchProfileDataResp = await postProfileRequest(
      '/profiles/fetch_by_json',
      payload
    );
    setResp(resp);
  }, [payload]);

  const handleDownloadCSV = useCallback(async () => {
    toggleDownloading(true);

    const resp: Response = await postProfileRequest(
      '/profiles/fetch_by_csv',
      {
        emails: payload.emails?.filter(
          (str) => !respData?.missing_emails.includes(str)
        ),
        emp_nums: payload.emp_nums?.filter(
          (str) => !respData?.missing_emp_nums.includes(str)
        ),
      } as StaffFetcherData,
      {
        headers: { 'Content-Type': 'text/csv' },
      }
    );
    const fileContent = await resp.text();

    toggleDownloading(false);

    window.open('data:text/csv;charset=utf-8,' + escape(fileContent));
  }, [respData, payload]);

  useEffect(() => {
    if (Object.keys(payload).length > 0) fetchData();
  }, [payload]);

  return (
    <div>
      <Section>
        <MissingItems
          label="Emails not found"
          data={respData?.missing_emails}
        />
        <MissingItems
          label="Employee numbers not found"
          data={respData?.missing_emp_nums}
        />
      </Section>

      <Typography type="h2" weight="bold" space="sm">
        Found Profiles
      </Typography>
      <Table colDefs={tableColDefs} data={respData?.profiles}></Table>
      <ActionStyle>
        <Button
          type="default"
          htmlType="button"
          onClick={onBack}
          outline={false}
        >
          Back
        </Button>
        <Button
          type="primary"
          htmlType="button"
          onClick={handleDownloadCSV}
          icon={<DownloadIcon />}
          disabled={downloading || respData?.profiles.length === 0}
          loading={downloading}
        >
          Download CSV
        </Button>
      </ActionStyle>
    </div>
  );
});

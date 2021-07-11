import React, { memo } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { AppModule } from '../components/AppModule';
import { LoadingIcon } from '../components/Icons';
import { LayoutBasic } from '../components/Layout/Basic';
import { userInfoState } from '../recoil-atoms/user-info';
import { useGetRequest } from '../utils/useRequest';

const AppList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -${(p) => p.theme.spacing.sm};
  margin-right: -${(p) => p.theme.spacing.sm};
`;

const LoadingIconStyle = styled(LoadingIcon)`
  font-size: 2em;
`;

const LoadingWrapper = styled.div`
  display: flex;
  margin-top: 3em;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const AppModuleCol = styled.div`
  flex-basis: 33.3333333%;
  flex-grow: 1;
  flex-shrink: 0;
  padding: ${(p) => p.theme.spacing.sm};
`;

export const DashboardPage = memo((props) => {
  const userInfo = useRecoilValue(userInfoState);

  const { error, loading, data } = useGetRequest<FetchAppRespSuccess>(
    '/auth/get_apps'
  );

  return (
    <LayoutBasic>
      {loading && (
        <LoadingWrapper>
          <LoadingIconStyle className="icon" />
        </LoadingWrapper>
      )}
      <AppList>
        {data?.apps.map((item) => (
          <AppModuleCol key={item.name}>
            <AppModule
              data={item}
              defaultPhoto="https://picsum.photos/id/119/3264/2176"
              disabled={!userInfo?.permissions.includes(item.name)}
            />
          </AppModuleCol>
        ))}
      </AppList>
    </LayoutBasic>
  );
});

export default DashboardPage;

import { useEffect } from 'react';
import { memo } from 'react';
import { useSetRecoilState } from 'recoil';
import { Route, useHistory } from 'react-router';
import { removeToken } from '../services/base-api';
import { getUserInfo } from '../services/profile';
import { userInfoState } from '../recoil-atoms/user-info';
import { RouteProps } from 'react-router-dom';

export const AuthRoute = memo<RouteProps>((props) => {
  const history = useHistory();
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    async function getInfo() {
      const resp = await getUserInfo();

      if (!resp) {
        history.push('/login');
        removeToken();
      }

      // store user info
      setUserInfo(resp);
    }

    getInfo();
  }, []);

  return <Route {...props} />;
});

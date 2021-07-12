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
    const abort = new AbortController();
    async function getInfo() {
      const resp = await getUserInfo(abort.signal);

      if (!resp) {
        history.push('/login');
        removeToken();
      }

      // store user info
      setUserInfo(resp);
    }

    getInfo();

    return () => {
      abort.abort();
    };
  }, [history, setUserInfo]);

  return <Route {...props} />;
});

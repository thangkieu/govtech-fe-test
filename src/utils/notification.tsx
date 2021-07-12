import Notification from 'rc-notification';
import { NotificationInstance } from 'rc-notification/lib/Notification';
import 'rc-notification/assets/index.css';

import { CancelIcon } from '../components/Icons';

let notification: NotificationInstance;

Notification.newInstance(
  {
    // prefixCls: 'noti',
    style: {
      top: '2rem',
      right: '2rem',
    },
    maxCount: 5,
  },
  (n) => {
    notification = n;
  }
);

export const notify = {
  error(message: string) {
    notification.notice({
      duration: 3,
      content: (
        <div className="noti-error noti-content">
          <CancelIcon className="noti-icon" />
          <div>
            <h4 className="noti-title">Error</h4>
            <span>{message}</span>
          </div>
        </div>
      ),
    });
  },
};
export { notification };

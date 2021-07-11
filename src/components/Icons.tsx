import styled from 'styled-components';
import { ReactComponent as RefreshIcon } from '../icons/refresh.svg';

export { ReactComponent as DownloadIcon } from '../icons/download.svg';
export { ReactComponent as ExitIcon } from '../icons/exit.svg';
export { ReactComponent as BrokenLink } from '../icons/broken-link.svg';
export { ReactComponent as CancelIcon } from '../icons/cancel.svg';

export { RefreshIcon };

export const LoadingIcon = styled(RefreshIcon)`
  animation: spin 1.5s linear infinite;
`;

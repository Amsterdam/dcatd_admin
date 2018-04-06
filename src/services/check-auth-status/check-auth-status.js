import { login } from '../auth/auth';

export default () => {
  return (response) => {
    if (!response.ok && response.status === 401) {
      login();
    } else if (!response.ok) {
      throw new Error('Unexpected response from an XHR call.');
    }
    return response;
  };
};

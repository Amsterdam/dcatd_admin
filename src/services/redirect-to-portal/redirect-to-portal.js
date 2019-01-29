import api from '../api/api';

const redirectToPortal = (type = 'detail') => {
  const url = window.sessionStorage.getItem(type === 'detail' ? 'DCATD_DETAIL_REDIRECT_URL' : 'DCATD_LIST_REDIRECT_URL');

  window.sessionStorage.removeItem('DCATD_DETAIL_REDIRECT_URL');
  window.sessionStorage.removeItem('DCATD_LIST_REDIRECT_URL');
  api.resetEndpointCache();

  window.location.assign(url || '#/datasets');
};


export default redirectToPortal;

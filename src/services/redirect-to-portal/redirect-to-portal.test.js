import redirectToPortal from './redirect-to-portal';
import api from '../api/api';

describe('The redirect-to-portal service', () => {
  let mockUrl = 'http://portal/redirect-url';
  let origSessionStorage;
  let origLocationAssign;

  beforeEach(() => {
    origSessionStorage = window.sessionStorage;
    origLocationAssign = window.location.assign;

    Object.defineProperty(window, 'location', {
      value: {
        assign: jest.fn()
      },
      writable: true
    });

    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: () => mockUrl,
        removeItem: jest.fn(),
        [api.datasets]: 'test'
      },
      writable: true
    });
  });

  afterEach(() => {
    window.sessionStorage = origSessionStorage;
    window.location.assign = origLocationAssign;
  });

  it('sets window.location to the value from DCATD_DETAIL_REDIRECT_URL and resets sessionStorage', () => {
    redirectToPortal();

    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('DCATD_DETAIL_REDIRECT_URL');
    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('DCATD_LIST_REDIRECT_URL');
    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith(api.datasets);

    expect(window.location.assign).toHaveBeenCalledWith(mockUrl);
  });

  it('sets window.location to the value from DCATD_LIST_REDIRECT_URL and resets sessionStorage', () => {
    redirectToPortal('list');

    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('DCATD_DETAIL_REDIRECT_URL');
    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('DCATD_LIST_REDIRECT_URL');
    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith(api.datasets);

    expect(window.location.assign).toHaveBeenCalledWith(mockUrl);
  });

  it('sets window.location to #/datasets when sessionStorage is empty and resets sessionStorage', () => {
    mockUrl = null;
    redirectToPortal('list');

    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('DCATD_DETAIL_REDIRECT_URL');
    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('DCATD_LIST_REDIRECT_URL');
    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith(api.datasets);

    expect(window.location.assign).toHaveBeenCalledWith('#/datasets');
  });
});

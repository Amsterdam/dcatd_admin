import redirectToPortal from './redirect-to-portal';

describe('The redirect-to-portal service', () => {
  const mockUrl = 'http://portal/redirect-url';
  let origSessionStorage;
  let origLocationAssign;

  beforeEach(() => {
    origSessionStorage = window.sessionStorage;
    origLocationAssign = window.location.assign;

    window.sessionStorage = {
      getItem: () => mockUrl,
      removeItem: jest.fn()
    };
    window.location.assign = jest.fn();
  });

  afterEach(() => {
    window.sessionStorage = origSessionStorage;
    window.location.assign = origLocationAssign;
  });

  it('sets window.location to the value from DCATD_DETAIL_REDIRECT_URL and resets sessionStorage', () => {
    redirectToPortal();

    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('DCATD_DETAIL_REDIRECT_URL');
    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('DCATD_LIST_REDIRECT_URL');

    expect(window.location.assign).toHaveBeenCalledWith(mockUrl);
  });

  it('sets window.location to the value from DCATD_LIST_REDIRECT_URL and resets sessionStorage', () => {
    redirectToPortal('list');

    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('DCATD_DETAIL_REDIRECT_URL');
    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('DCATD_LIST_REDIRECT_URL');

    expect(window.location.assign).toHaveBeenCalledWith(mockUrl);
  });
});
import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
  url: process.env.KEYCLOAK_URL,
  realm: process.env.KEYCLOAK_REALM,
  clientId: process.env.KEYCLOAK_CLIENT
});

const MIN_VALIDITY = 5;

keycloak.onTokenExpired = async () => {
  try {
    await keycloak.updateToken(MIN_VALIDITY);
  } catch (error) {
    // For some reason the token could not be updated.
  }
};

// The URI we need to redirect to for communication with the OAuth2
// authorization service
// const scopes = [
//   'CAT/R',
//   'CAT/W'
// ];

// const AuthScope = {
//   CatR: 'CAT/R',
//   CatW: 'CAT/W'
// }

// // Catalogus (Dcatd) admin
// const dcatdScopes = [
//   AuthScope.CatR, // Redacteursrechten
//   AuthScope.CatW, // Beheerdersrechten
// ]

let tokenData;

export function getAccessToken() {
  // return keycloak.token ?? ''
  // eslint-disable-next-line no-void
  return keycloak.token !== null && keycloak.token !== void 0 ? keycloak.token : '';
}

export function isAuthenticated() {
  try {
    if (keycloak.isTokenExpired()) {
      return false;
    }
  } catch (error) {
    // Unable to check if the token is expired, this means that we probably don't have a token so
    // let's return false.
    return false;
  }

  // return keycloak.authenticated ?? false
  // eslint-disable-next-line no-void
  return keycloak.authenticated !== null && keycloak.authenticated !== void 0 ?
    keycloak.authenticated : false;
}

export function login() {
  keycloak.login();
}

export function logout() {
  keycloak.logout();
}

export async function initAuth() {
  // For more information about these options consult the documentation:
  // https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter
  const authenticated = await keycloak.init({
    checkLoginIframe: false,
    pkceMethod: 'S256',
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`
  });

  if (authenticated) {
    await keycloak.loadUserInfo();
  } else {
    login();
  }

  return authenticated;
}

export function isAdmin() {
  return (tokenData) ? tokenData.scopes.includes('CAT/W') : false;
}

/**
 * Creates an instance of the native JS `Headers` class containing the
 * authorization headers needed for an API call.
 *
 * @returns {Object<string, string>} The headers needed for an API call.
 */
// export function getAuthHeaders() {
//   return { Authorization: `Bearer ${getAccessToken()}` };
// }

export const getAuthHeaders = () => {
  if (!isAuthenticated() || !keycloak.token) {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return { Authorization: `Bearer ${getAccessToken()}` };
};

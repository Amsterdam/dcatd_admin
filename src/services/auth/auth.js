
/* eslint-disable */
import Keycloak from 'keycloak-js';
import api from '../../services/api/api';
// import queryStringParser from '../query-string-parser/query-string-parser';
// import stateTokenGenerator from '../state-token-generator/state-token-generator';
// import accessTokenParser from '../access-token-parser/access-token-parser';

const keycloak = Keycloak({
  url: process.env.KEYCLOAK_URL,
  realm: process.env.KEYCLOAK_REALM,
  clientId: process.env.KEYCLOAK_CLIENT,
});

const MIN_VALIDITY = 5;

keycloak.onTokenExpired = async () => {
  try {
    await keycloak.updateToken(MIN_VALIDITY);
  } catch (error) {
    // For some reason the token could not be updated.
  }
}



// A map of the error keys, that the OAuth2 authorization service can
// return, to a full description
const ERROR_MESSAGES = {
  invalid_request: 'The request is missing a required parameter, includes an invalid parameter value, ' +
    'includes a parameter more than once, or is otherwise malformed.',
  unauthorized_client: 'The client is not authorized to request an access token using this method.',
  access_denied: 'The resource owner or authorization server denied the request.',
  unsupported_response_type: 'The authorization server does not support obtaining an access token using ' +
    'this method.',
  invalid_scope: 'The requested scope is invalid, unknown, or malformed.',
  server_error: 'The authorization server encountered an unexpected condition that prevented it from ' +
    'fulfilling the request.',
  temporarily_unavailable: 'The authorization server is currently unable to handle the request due to a ' +
    'temporary overloading or maintenance of the server.'
};

// The parameters the OAuth2 authorization service will return on
// success
const AUTH_PARAMS = ['access_token', 'token_type', 'expires_in', 'state'];

const API_ROOT = api.root;

// The URI we need to redirect to for communication with the OAuth2
// authorization service
const scopes = [
  'CAT/R',
  'CAT/W'
];

const encodedScopes = encodeURIComponent(scopes.join(' '));
export const AUTH_PATH = `/oauth2/authorize?idp_id=datapunt&response_type=token&client_id=dcatd_admin&scope=${encodedScopes}`;

// The keys of values we need to store in the session storage
//
// `location.pathname` string at the moment we redirect to the
// OAuth2 authorization service, and need to get back to afterwards
const RETURN_PATH = 'returnPath';
// The OAuth2 state(token) (OAuth terminology, has nothing to do with
// our app state), which is a random string
const STATE_TOKEN = 'stateToken';
// The access token returned by the OAuth2 authorization service
// containing user scopes and name
const ACCESS_TOKEN = 'accessToken';

let returnPath;
let tokenData;

/**
 * Finishes an error from the OAuth2 authorization service.
 *
 * @param code {string} Error code as returned from the service.
 * @param description {string} Error description as returned from the
 * service.
 */
// function handleError(code, description) {
//   sessionStorage.removeItem(STATE_TOKEN);
//   // Remove parameters from the URL, as set by the error callback from the
//   // OAuth2 authorization service, to clean up the URL.
//   // location.search = '';
//   throw new Error('Authorization service responded with error ' +
//       `${code} [${description}] (${ERROR_MESSAGES[code]})`);
// }

/**
 * Handles errors in case they were returned by the OAuth2 authorization
 * service.
 */
// function catchError() {
//   const params = queryStringParser(location.search);
//   if (params && params.error) {
//     handleError(params.error, params.error_description);
//   }
// }

/**
 * Returns the access token from session storage when available.
 *
 * @returns {string} The access token.
 */
// export function getAccessToken() {
//   return sessionStorage.getItem(ACCESS_TOKEN);
// }

/**
 * Returns the access token from the params specified.
 *
 * Only does so in case the params form a valid callback from the OAuth2
 * authorization service.
 *
 * @param {Object.<string, string>} params The parameters returned.
 * @return {string} The access token in case the params for a valid callback,
 * null otherwise.
 */
// function getAccessTokenFromParams(params) {
//   if (!params) {
//     return null;
//   }

//   const stateToken = sessionStorage.getItem(STATE_TOKEN);

//   // The state param must be exactly the same as the state token we
//   // have saved in the session (to prevent CSRF)
//   const stateTokenValid = params.state && params.state === stateToken;

//   // It is a callback when all authorization parameters are defined
//   // in the params the fastest check is not to check if all
//   // parameters are defined but to check that no undefined parameter
//   // can be found
//   const paramsValid = !AUTH_PARAMS.some(param => params[param] === undefined);

//   if (paramsValid && !stateTokenValid) {
//     // This is a callback, but the state token does not equal the
//     // one we have saved; report to Sentry
//     throw new Error(`Authenticator encountered an invalid state token (${params.state})`);
//   }

//   return stateTokenValid && paramsValid ? params.access_token : null;
// }

/**
 * Gets the access token and return path, and clears the session storage.
 */
// function handleCallback() {
//   const params = queryStringParser(location.hash);
//   const accessToken = getAccessTokenFromParams(params);
//   if (accessToken) {
//     sessionStorage.setItem(ACCESS_TOKEN, accessToken);
//     returnPath = sessionStorage.getItem(RETURN_PATH);
//     sessionStorage.removeItem(RETURN_PATH);
//     sessionStorage.removeItem(STATE_TOKEN);
//     location.href = returnPath;
//   }
// }

/**
 * Redirects to the OAuth2 authorization service.
 */
// export function login() {
//   const pathname = '/dcatd_admin/';
//   // Get the URI the OAuth2 authorization service needs to use as callback
//   const callback = encodeURIComponent(`${location.protocol}//${location.host}${pathname}`);
//   // Get a random string to prevent CSRF
//   const stateToken = stateTokenGenerator();
//   const encodedStateToken = encodeURIComponent(stateToken);

//   if (!stateToken) {
//     throw new Error('crypto library is not available on the current browser');
//   }

//   sessionStorage.removeItem(ACCESS_TOKEN);
//   sessionStorage.setItem(RETURN_PATH, pathname);
//   sessionStorage.setItem(STATE_TOKEN, stateToken);

//   location.href = `${API_ROOT}${AUTH_PATH}&state=${encodedStateToken}&redirect_uri=${callback}`;
// }

// export function logout() {
//   sessionStorage.removeItem(ACCESS_TOKEN);
//   location.reload();
// }

/**
 * Restores the access token from session storage when available.
 */
// function restoreAccessToken() {
//   const accessToken = getAccessToken();
//   if (accessToken) {
//     const parsedToken = accessTokenParser(accessToken);
//     const now = Math.floor(new Date().getTime() / 1000);

//     if (!parsedToken.expiresAt || (parsedToken.expiresAt <= now)) {
//       tokenData = {};
//       logout();
//       return false;
//     }

//     tokenData = parsedToken;
//   }
//   return true;
// }

/**
 * Initializes the auth service when needed. Catches any callback params and
 * errors from the OAuth2 authorization service when available.
 *
 * When no access token is available it initiates the login process which will
 * redirect the user to the OAuth2 authorization service.
 *
 */
// export function initAuth() {
//   returnPath = '';
//   restoreAccessToken();
//   catchError(); // Catch any error from the OAuth2 authorization service
//   handleCallback(); // Handle a callback from the OAuth2 authorization service

//   if (!getAccessToken()) { // Restore acces token from session storage
//     login();
//   }
// }

export function getAccessToken() {
  return keycloak.token !== null && keycloak.token !== void 0 ? keycloak.token : '';
}

export function isAuthenticated() {
  try {
    if (keycloak.isTokenExpired()) {
      return false
    }
  } catch (error) {
    // Unable to check if the token is expired, this means that we probably don't have a token so let's return false.
    return false
  }

  return keycloak.authenticated !== null && keycloak.authenticated !== void 0 ? keycloak.authenticated : false;
}

export function login() {
  keycloak.login()
}

export function logout() {
  keycloak.logout()
}

export async function initAuth() {
  // For more information about these options consult the documentation:
  // https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter
  const authenticated = await keycloak.init({
    checkLoginIframe: false,
    pkceMethod: 'S256',
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
  })

  if (authenticated) {
    await keycloak.loadUserInfo()
  }

  return authenticated
}

/**
 * Gets the return path that was saved before the login process was initiated.
 *
 * @returns {string} The return path where we moved away from when the login
 * process was initiated.
 */
export function getReturnPath() {
  return returnPath;
}

export function isAdmin() {
  console.log('tokenData', tokenData)
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
    return {}
  }

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return { Authorization: `Bearer ${getAccessToken()}` }
}
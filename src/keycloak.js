import Keycloak from 'keycloak-js';
import environment from './environment';

const keycloakConfig = {
  url: environment.KEYCLOAK_URL,
  realm: environment.KEYCLOAK_REALM,
  clientId: environment.KEYCLOAK_CLIENT
};

const keycloak = Keycloak(keycloakConfig);
export default keycloak;

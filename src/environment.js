// Note that environment variables on process.env are only available in development if a
// .env file is present, to easily override the defaults
const environment = {
  NODE_ENV: process.env.NODE_ENV || 'acceptance',
  PUBLIC_URL: process.env.PUBLIC_URL || 'https://acc.data.amsterdam.nl/dcatd_admin',
  KEYCLOAK_URL: process.env.KEYCLOAK_URL || 'https://iam.amsterdam.nl/auth',
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM || 'datapunt-ad-acc',
  KEYCLOAK_CLIENT: process.env.KEYCLOAK_CLIENT || 'dcatd-admin'
};

export default environment;

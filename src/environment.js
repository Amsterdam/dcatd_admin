// Note that environment variables on process.env are only available in development if a
// .env file is present, to easily override the defaults
const defaultEnvironment = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  PUBLIC_URL: process.env.PUBLIC_URL || 'https://data.amsterdam.nl/dcatd_admin',
  KEYCLOAK_URL: process.env.KEYCLOAK_URL || 'https://iam.amsterdam.nl/auth',
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM || 'datapunt-ad',
  KEYCLOAK_CLIENT: process.env.KEYCLOAK_CLIENT || 'dcatd-admin'
};

// eslint-disable-next-line import/no-mutable-exports
let environment = { ...defaultEnvironment };

if (window.location.host === 'localhost:3001') {
  environment = {
    ...defaultEnvironment,
    ...{
      NODE_ENV: 'development',
      PUBLIC_URL: 'https://localhost:3001/dcatd_admin',
      KEYCLOAK_REALM: 'datapunt-ad-acc'
    }
  };
}

if (window.location.host === 'acc.data.amsterdam.nl') {
  environment = {
    ...defaultEnvironment,
    ...{
      NODE_ENV: 'acceptance',
      PUBLIC_URL: 'https://acc.data.amsterdam.nl/dcatd_admin',
      KEYCLOAK_REALM: 'datapunt-ad-acc'
    }
  };
}

export default environment;

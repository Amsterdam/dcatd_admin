const defaultEnvironment = {
  NODE_ENV: 'production',
  PUBLIC_URL: 'https://data.amsterdam.nl/dcatd_admin',
  KEYCLOAK_URL: 'https://iam.amsterdam.nl/auth',
  KEYCLOAK_REALM: 'datapunt-ad',
  KEYCLOAK_CLIENT: 'dcatd-admin'
};

/**
 * Gets the environment variables provided at startup to the Docker container.
 *
 * The values are placed in a script tag in the HTML which contains a JSON
 * representation of the environment.
 */
function getEnvironmentVariables() {
  const element = document.getElementById('environment');
  let config = {};

  if (element) {
    if (element.textContent) {
      config = JSON.parse(element.textContent);
    }
  }

  return config;
}

// eslint-disable-next-line import/no-mutable-exports
let environment = { ...defaultEnvironment, ...getEnvironmentVariables() };

if (window.location.host === 'acc.data.amsterdam.nl') {
  environment = {
    ...defaultEnvironment,
    ...getEnvironmentVariables(),
    ...{
      KEYCLOAK_REALM: 'datapunt-ad-acc'
    }
  };
}

export default environment;

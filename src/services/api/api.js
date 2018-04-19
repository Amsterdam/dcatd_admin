const baseUrl = `https://${process.env.NODE_ENV !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl`;

export default {
  datasets: `${baseUrl}/dcatd/datasets`,
  schema: `${baseUrl}/dcatd/openapi`
};

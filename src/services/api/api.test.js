import api from './api';

describe('The api service', () => {
  describe('in development', () => {
    it('returns root api url', () => {
      expect(api.root).toEqual('https://acc.api.data.amsterdam.nl');
    });

    it('returns files api url', () => {
      expect(api.files).toEqual('https://acc.api.data.amsterdam.nl/dcatd/files');
    });

    it('returns datasets api url', () => {
      expect(api.datasets).toEqual('https://acc.api.data.amsterdam.nl/dcatd/datasets');
    });

    it('returns schema api url', () => {
      expect(api.schema).toEqual('https://acc.api.data.amsterdam.nl/dcatd/openapi');
    });
  });

  describe('in production', () => {
    beforeEach(() => {
      api.setRoot('production');
    });

    it('returns root api url', () => {
      expect(api.root).toEqual('https://api.data.amsterdam.nl');
    });

    it('returns files api url', () => {
      expect(api.files).toEqual('https://api.data.amsterdam.nl/dcatd/files');
    });

    it('returns datasets api url', () => {
      expect(api.datasets).toEqual('https://api.data.amsterdam.nl/dcatd/datasets');
    });

    it('returns schema api url', () => {
      expect(api.schema).toEqual('https://api.data.amsterdam.nl/dcatd/openapi');
    });
  });
});

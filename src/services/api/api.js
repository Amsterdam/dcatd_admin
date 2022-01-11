import environment from '../../environment';

class Api {
  constructor() {
    this.setRoot();
  }

  setRoot(nodeEnv = environment.NODE_ENV) {
    this._root = `https://${nodeEnv !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl`;
  }

  get root() {
    return this._root;
  }

  get files() {
    return `${this._root}/dcatd/files`;
  }

  get datasets() {
    return `${this._root}/dcatd/datasets`;
  }

  get schema() {
    return `${this._root}/dcatd/openapi`;
  }

  resetEndpointCache() {
    const url = this.datasets;
    Object.entries(window.sessionStorage).forEach(([itemKey]) => {
      if (itemKey.startsWith(url)) {
        window.sessionStorage.removeItem(itemKey);
      }
    });
  }
}

export default new Api();

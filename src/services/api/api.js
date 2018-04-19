class Api {
  constructor() {
    this.setRoot();
  }

  setRoot(nodeEnv = process.env.NODE_ENV) {
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
}

export default new Api();

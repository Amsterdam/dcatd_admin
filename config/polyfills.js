/* eslint-disable */

if (process.env.NODE_ENV === 'test') {
  const Enzyme = require('enzyme');
  const Adapter = require('enzyme-adapter-react-16');
  // console.log('-----------------------', enzyme);
  Enzyme.configure({ adapter: new Adapter() });

  const JSDOM = require('jsdom').JSDOM;
  const { window } = new JSDOM();
  global.window = window;

  global.fetch = require('jest-fetch-mock');
}

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

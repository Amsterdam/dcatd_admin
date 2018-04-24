/* eslint-disable */

import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.mount = mount;
global.render = render;

// load the dom
const JSDOM = jsdom.JSDOM;
const { window } = new JSDOM();
global.window = window;

// add global fetch
global.fetch = require('jest-fetch-mock');

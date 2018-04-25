import React from 'react';

import Markdown from './Markdown';

describe('The Markdown component (react-jsonschema-forms custom widget)', () => {
  let wrap;
  let instance;

  beforeEach(() => {
    wrap = shallow(<Markdown id="very-unique-id" />);
    instance = wrap.instance();
  });

  describe('renders component', () => {
    it('renders default', () => {
      expect(wrap).toMatchSnapshot();
    });

    it('renders new value', () => {
      wrap.setProps({
        value: 'foo'
      });

      expect(wrap).toMatchSnapshot();
    });
  });

  describe('triggering events', () => {
    it('updates the value after change', () => {
      const event = { target: { value: 'bar' } };

      instance.props.onChange(event);
      expect(wrap).toMatchSnapshot();
    });

    it('updates the value to undefined when string is empty', () => {
      const event = { target: { value: '' } };

      instance.props.onChange(event);
      expect(wrap).toMatchSnapshot();
    });
  });
});

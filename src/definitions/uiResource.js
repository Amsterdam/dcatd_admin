import { dayPickerProps } from './localization';

export default {
  'ui:field': [
    'dropdown',
    'rte'
  ],
  'ui:widget': [
    'markdown',
    'file'
  ],

  'dcat:accessURL': {
    'ui:widget': 'file',
    'ui:placeholder': 'http://'
  },
  'ams:classification': {
    'ui:widget': 'hidden'
  },
  'dct:description': {
    'ui:field': 'rte',
    'ui:placeholder': 'tekst of markdown',
    rte: {
      format: 'markdown'
    }
  },
  'dct:format': {
    'ui:widget': 'hidden'
  },
  'dct:identifier': {
    'ui:widget': 'hidden'
  },
  'dct:modified': {
    'ui:field': 'rdp',
    rdp: {
      placeholder: 'Kies een datum',
      dayPickerProps
    }
  },
  'ams:serviceType': {
    'ui:widget': 'hidden'
  },
  'foaf:isPrimaryTopicOf': {
    'dct:issued': {
      'ui:widget': 'hidden'
    },
    'dct:modified': {
      'ui:widget': 'hidden'
    }
  }
};

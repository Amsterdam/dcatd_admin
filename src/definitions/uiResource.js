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
  'dcat:byteSize': {
    'ui:readonly': true
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
  'ams:distributionType': {
    'ui:placeholder': 'maak een keuze'
  },
  'dct:format': {
    'ui:widget': 'hidden',
    'ui:placeholder': 'maak een keuze'
  },
  'dct:modified': {
    'ui:field': 'rdp',
    rdp: {
      placeholder: 'Kies een datum',
      dayPickerProps
    }
  },
  'ams:serviceType': {
    'ui:widget': 'hidden',
    'ui:placeholder': 'maak een keuze'
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

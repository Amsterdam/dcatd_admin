// import dayPickerProps from './day-picker';
// rte has to be fixed in react-jsonschema-form-extras
// import rte from './rte';

export default {
  'ui:field': [
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
    'ui:widget': 'hidden'
  },
  'ams:classification': {
    'ui:widget': 'hidden'
  },
  'dct:description': {
    'ui:widget': 'markdown',
    'ui:placeholder': 'tekst of markdown'
    // 'ui:field': 'rte',
    // rte
  },
  'ams:distributionType': {
    'ui:placeholder': 'maak een keuze'
  },
  'dct:format': {
    'ui:widget': 'hidden',
    'ui:placeholder': 'maak een keuze'
  },
  'dct:modified': {
    // 'ui:widget': 'alt-date'
    // 'ui:field': 'rdp',
    // rdp: {
    //   placeholder: 'Kies een datum',
    //   dayPickerProps
    // }
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

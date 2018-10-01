const uiResource = {
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
    'ui:widget': 'hidden',
    'ui:field': 'filesize'
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
      'ui:field': 'readonly'
    },
    'dct:modified': {
      'ui:field': 'readonly'
    }
  }
};

export default uiResource;

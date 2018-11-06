const uiDataset = {
  'ui:field': [
    'resources',
    'dropdown',
    'rte'
  ],
  'ui:widget': [
    'markdown'
  ],

  'dcat:contactPoint': {
    'ui:order': [
      'vcard:fn',
      'vcard:hasEmail',
      'vcard:hasURL'
    ],

    'vcard:hasEmail': {
      'ui:placeholder': 'jan@amsterdam.nl'
    },
    'vcard:hasURL': {
      'ui:placeholder': 'http://'
    }
  },
  'dcat:distribution': {
    'ui:field': 'resources'
  },
  'dct:description': {
    'ui:widget': 'markdown',
    'ui:placeholder': 'tekst of markdown'
    // 'ui:field': 'rte',
    // rte
  },
  'dcat:landingPage': {
    'ui:placeholder': 'http://'
  },
  'dct:temporal': {
    'time:hasBeginning': {
      // 'ui:widget': 'alt-date'
      // 'ui:field': 'rdp',
      // rdp: {
      //   placeholder: 'Kies een datum',
      //   dayPickerProps
      // }
    },
    'time:hasEnd': {
      // 'ui:widget': 'alt-date'
      // 'ui:field': 'rdp',
      // rdp: {
      //   placeholder: 'Kies een datum',
      //   dayPickerProps
      // }
    }
  },
  'ams:owner': {
    'ui:field': 'dropdown',
    'ui:placeholder': '',
    'ui:options': {
      allowAdditions: true,
      multiple: false
    }
  },
  'dcat:keyword': {
    'ui:field': 'dropdown',
    'ui:placeholder': '',
    'ui:options': {
      allowAdditions: true,
      multiple: true
    }
  },
  'dct:publisher': {
    'ui:order': [
      'foaf:name',
      'foaf:mbox',
      'foaf:homepage'
    ],

    'foaf:homepage': {
      'ui:placeholder': 'http://'
    },
    'foaf:mbox': {
      'ui:placeholder': 'jan@amsterdam.nl'
    }
  },
  'dct:identifier': {
    'ui:field': 'readonly',
    'ui:options': {
      title: 'Identifier'
    }
  },
  'dcat:theme': {
    'ui:field': 'dropdown',
    'ui:placeholder': '',
    'ui:options': {
      allowAdditions: false,
      multiple: true
    }
  },
  'foaf:isPrimaryTopicOf': {
    'dct:issued': {

    },
    'dct:modified': {
      'ui:field': 'readonly'
    }
  },
  'overheid:grondslag': {
    'ui:widget': 'markdown',
    'ui:placeholder': 'tekst of markdown'
  },
  'overheidds:doel': {
    'ui:widget': 'markdown',
    'ui:placeholder': 'tekst of markdown'
  },
  'ams:sortModified': {
    'ui:field': 'readonly'
  }
};

export default uiDataset;

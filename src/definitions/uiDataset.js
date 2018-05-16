// import dayPickerProps from './day-picker';
// rte has to be fixed in react-jsonschema-form-extras
// import rte from './rte';

export default {
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
    'ui:widget': 'markdown'
    // 'ui:field': 'rte',
    // rte
  },
  'dcat:landingPage': {
    'ui:placeholder': 'http://'
  },
  'dct:temporal': {
    'time:hasBeginning': {
      'ui:widget': 'alt-date'
      // 'ui:field': 'rdp',
      // rdp: {
      //   placeholder: 'Kies een datum',
      //   dayPickerProps
      // }
    },
    'time:hasEnd': {
      'ui:widget': 'alt-date'
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
    'ui:widget': 'hidden'
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
      'ui:widget': 'alt-date'
      // 'ui:field': 'rdp',
      // rdp: {
      //   placeholder: 'Kies een datum',
      //   dayPickerProps
      // }
    },
    'dct:modified': {
      'ui:widget': 'hidden'
    }
  }
};

import { dayPickerProps } from '../localization';

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
    'ui:field': 'rte',
    'ui:placeholder': 'tekst of markdown',
    rte: {
      format: 'markdown'
    }
  },
  'dcat:landingPage': {
    'ui:placeholder': 'http://'
  },
  'dct:temporal': {
    'time:hasBeginning': {
      'ui:field': 'rdp',
      rdp: {
        placeholder: 'Kies een datum',
        dayPickerProps
      }
    },
    'time:hasEnd': {
      'ui:field': 'rdp',
      rdp: {
        placeholder: 'Kies een datum',
        dayPickerProps
      }
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
      'ui:widget': 'hidden'
    },
    'dct:modified': {
      'ui:widget': 'hidden'
    }
  }
};

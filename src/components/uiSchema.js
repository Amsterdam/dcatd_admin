export default {
  'ui:field': [
    'resources'
  ],
  'ui:widget': [
    'markdown',
    'dropdown'
  ],

  'ui:order': [
    'dct:title',
    'dct:description',
    'dcat:distribution',

    'overheidds:doel',

    'dct:accrualPeriodicity',
    'dct:Temporal',

    'foaf:isPrimaryTopicOf',
    'dct:Spatial',
    'dct:identifier',
    'dct:language',

    'dcat:contactPoint',
    'dct:publisher',

    'dcat:theme',
    'dcat:keyword',
    'dct:license',

    '*'
  ],

  'dcat:contactPoint': {
    'ui:order': [
      'vcard:fn',
      'vcard:hasEmail',
      'vcard:hasURL'
    ],

    'vcard:hasEmail': {
      'ui:placeholder': 'pipo@amsterdam.nl'
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
  },
  'dcat:keyword': {
    'ui:widget': 'dropdown',
    'ui:placeholder': '',
    'ui:options': {
      allowAdditions: false,
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
      'ui:placeholder': 'pipo@amsterdam.nl'
    }
  },
  'dct:identifier': {
    'ui:widget': 'hidden'
  },
  'dcat:theme': {
    'ui:widget': 'dropdown',
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

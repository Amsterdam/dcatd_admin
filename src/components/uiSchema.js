export default {
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
      'ui:placeholder': 'steve@apple.com'
    },
    'vcard:hasURL': {
      'ui:placeholder': 'http://'
    }
  },
  'dcat:distribution': {
    items: {
      'ui:order': [
        'dct:title',
        'dct:description',
        'dcat:downloadURL',
        'dct:license',
        'dcat:mediaType',

        '*'
      ]
    },
    'dcat:accessURL': {
      'ui:placeholder': 'http://'
    }
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
      'ui:placeholder': 'steve@apple.com'
    }
  },
  'dcat:theme': {
    'ui:widget': 'dropdown',
    'ui:placeholder': '',
    'ui:options': {
      allowAdditions: false,
      multiple: true
    }
  }
};

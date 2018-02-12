export default {
  'ui:widget': 'markdown',
  'ui:order': [
    'dct:title',
    'dct:description',
    'dcat:distribution',

    'overheidds:doel',

    'dct:accrualPeriodicity',
    'dct:Temporal',

    'dcat:contactPoint',
    'dcat:theme',
    'dct:Spatial',
    'dct:identifier',
    'dct:language',
    'dct:publisher',
    'dcat:keyword',
    'foaf:isPrimaryTopicOf',

    '*'
  ],

  'dcat:contactPoint': {
    'vcard:fn': {
      'ui:widget': 'textarea'
    },
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
    'ui.widget': 'textarea'
  },
  'dct:Spatial': {
    'ui.widget': 'textarea'
  },
  'overheidds:doel': {
    'ui.widget': 'textarea'
  }
};

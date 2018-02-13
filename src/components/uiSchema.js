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
  // 'dcat:keyword': {
  //   'ui:widget': 'tags',
  //   'ui:placeholder': ''
  // },
  'dct:Spatial': {
    'ui.widget': 'textarea'
  },
  'dcat:theme': {
    'ui:widget': 'dropdown',
    'ui:placeholder': 'Bevolking, Dienstverlening',
    'ui:options': {
      allowAdditions: false,
      multiple: true
    }
  },
  'overheidds:doel': {
    'ui.widget': 'textarea'
  }
};

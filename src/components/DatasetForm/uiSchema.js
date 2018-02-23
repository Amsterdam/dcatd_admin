import { MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT } from '../localization';

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
    'ui:field': 'rte',
    'ui:placeholder': 'tekst of markdown',
    rte: {
      format: 'markdown'
    }
  },
  'dct:temporal': {
    'time:hasBeginning': {
      'ui:placeholder': 'Kies een datum',
      'ui:field': 'rdp',
      rdp: {
        showOverlay: true,
        hideOnDayClick: false,
        dayPickerProps: {
          locale: 'nl',
          firstDayOfWeek: 1,
          months: MONTHS,
          weekdaysLong: WEEKDAYS_LONG,
          weekdaysShort: WEEKDAYS_SHORT,
          disabledDays: {
            daysOfWeek: [0, 6]
          }
        }
      }
    },
    'time:hasEnd': {
      'ui:placeholder': 'Kies een datum',
      'ui:field': 'rdp'
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
      'ui:placeholder': 'pipo@amsterdam.nl'
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

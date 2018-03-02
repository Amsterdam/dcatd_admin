import { dayPickerProps } from './day-picker';

export default {
  'ui:field': [
    'dropdown',
    'rte'
  ],
  'ui:widget': [
    'markdown'
  ],

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
        // hideOnDayClick: false,
        // showOverlay: true,
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
  'dct:identifier': {
    'ui:widget': 'hidden'
  }
};

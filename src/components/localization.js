export const MONTHS = [
  'Januari',
  'Ferbruari',
  'Maart',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Augustus',
  'September',
  'October',
  'November',
  'December'
];

export const WEEKDAYS_LONG = [
  'zondag',
  'maandag',
  'dinsdag',
  'woensdag',
  'donderdag',
  'vrijdag',
  'zaterdag'
];

export const WEEKDAYS_SHORT = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];

export const dayPickerProps = {
  locale: 'nl',
  firstDayOfWeek: 1,
  months: MONTHS,
  weekdaysLong: WEEKDAYS_LONG,
  weekdaysShort: WEEKDAYS_SHORT,
  disabledDays: {
    daysOfWeek: [0, 6]
  }
};

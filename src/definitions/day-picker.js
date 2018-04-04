const MONTHS = [
  'Januari',
  'Februari',
  'Maart',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Augustus',
  'September',
  'Oktober',
  'November',
  'December'
];

const WEEKDAYS_LONG = [
  'zondag',
  'maandag',
  'dinsdag',
  'woensdag',
  'donderdag',
  'vrijdag',
  'zaterdag'
];

const WEEKDAYS_SHORT = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];

const dayPickerProps = {
  locale: 'nl',
  firstDayOfWeek: 1,
  months: MONTHS,
  weekdaysLong: WEEKDAYS_LONG,
  weekdaysShort: WEEKDAYS_SHORT
};

export default dayPickerProps;

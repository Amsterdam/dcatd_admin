const dateFormat = new Intl.DateTimeFormat('nl-NL', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

dateFormat.formatDate = (date) => {
  return date ? dateFormat.format(new Date(date)) : '';
};

export default dateFormat;

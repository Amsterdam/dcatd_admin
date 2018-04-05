export default function scrollToError() {
  const element = document.querySelector('.field-error');

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

import transformErrors from './transform-errors';

describe('The transform-errors service', () => {
  const errors = [{
    message: 'is a required property'
  }, {
    message: 'should match format "date"'
  }, {
    message: 'should match format "email"'
  }, {
    message: 'should match format "uri"'
  }, {
    message: 'it will keep the original error if it cant be matched'
  }];

  describe('it will map english error messages to dutch ones', () => {
    it('returns root api url', () => {
      expect(transformErrors(errors)).toEqual([{
        message: 'Dit veld is verplicht.'
      }, {
        message: 'De ingevoerde datum is niet correct. Vul het in de juiste volgorde in.'
      }, {
        message: 'Het ingevoerde e-mailadres is niet correct. Controleer het e-mailadres.'
      }, {
        message: 'De ingevoerde URL is niet correct. Controleer de URL.'
      }, {
        message: 'it will keep the original error if it cant be matched'
      }]);
    });
  });
});

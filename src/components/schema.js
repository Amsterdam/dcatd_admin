export default {
  title: 'Dataset',
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      pattern: '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$'
    },
    lastName: {
      maximum: 8,
      type: 'string'
    },
    uri: {
      type: 'string',
      format: 'uri'
    },
    age: {
      description: 'Age in years',
      type: 'integer',
      minimum: 0
    },
    select: {
      type: 'string',
      enum: [42, 666],
      enumNames: ['zin', 'beest']
    },
    datum: {
      type: 'string',
      format: 'date'
    },
    tags:
    {
      type: 'array',
      items: {
        type: 'string'
      },
      minItems: 1,
      uniqueItems: true
    }
  },
  required: ['firstName', 'lastName']
};

module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/definitions/*.js'
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 45,
      branches: 34,
      functions: 43,
      lines: 43
    },
    './src/actions': {
      statements: 90,
      branches: 80,
      functions: 90,
      lines: 90
    },
    './src/reducers': {
      statements: 100,
      branches: 90,
      functions: 80,
      lines: 100
    },
    './src/services': {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90
    }
  },
  coverageReporters: ['lcov'],
  setupFiles: [
    '<rootDir>/config/jest.js',
    '<rootDir>/config/polyfills.js'
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.js?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).js?(x)'
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web'
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ],
  moduleDirectories: ['node_modules', 'src']
};

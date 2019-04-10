module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  collectCoverageFrom: [
    'src/**/*.{js,vue,jsx}',
    '!src/App.vue',
    '!src/**/*.test.js',
    '!src/view/**/*.{js,vue}',
    '!src/constants/**/*.{js,vue}',
    '!src/apis/**/*.js',
    '!src/i18n/**/*.js',
    '!node_modules/**',
  ],
}

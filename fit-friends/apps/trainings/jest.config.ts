/* eslint-disable */
export default {
  displayName: 'trainings',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  moduleNameMapper: {
    "/@fit-friends\/config/": "<RootDir>\/..\/..\/libs\/config\/src\/index.ts",
    "@fit-friends\/core": "<RootDir>\/..\/..\/libs\/core\/src\/index.ts",
    "@fit-friends\/shared-types": "<RootDir>\/..\/..\/libs\/shared-types\/src\/index.ts",
  },
  coverageDirectory: '../../coverage/apps/trainings',
};

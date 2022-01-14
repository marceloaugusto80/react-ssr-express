import { Config } from "@jest/types";

const options: Config.InitialOptions = {

  preset: "ts-jest",

  testEnvironment: "node",

  testTimeout: 10000,

  roots: [
    "<rootDir>/tests"
  ],

  testRegex: "\.spec\.tsx?$",

  setupFiles: ["<rootDir>/tests/setup.ts"],

  globals: {
    // mock injected build variables. See DefinePlugin options on webpack configuration files.
    __PRODUCTION__: true,
    __SERVER__: true
  },

  moduleNameMapper: {
    "^client\/(.*)$": "<rootDir>/src/client/$1",
    "^server\/(.*)$": "<rootDir>/src/server/$1",
    "^shared\/(.*)$": "<rootDir>/src/shared/$1",

    '\\.(jpe?g|png|gif|svg|woff2?|eot|ttf|otf)$': '<rootDir>/tests/_fixtures/empty-string.ts',
  }

}

export default options;
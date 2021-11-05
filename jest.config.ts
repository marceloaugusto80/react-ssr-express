import {InitialOptions} from "@jest/types/build/Config";



const options: InitialOptions = {
  
  preset: "ts-jest",
  
  testEnvironment: "node",
  
  testTimeout: 10000,
  
  roots: [
    "<rootDir>/__tests__/server",
    "<rootDir>/__tests__/client"
  ],

  testRegex: "\.spec\.tsx?$",
  
  globals: {
    // mock injected build variables. See DefinePlugin options on webpack configuration files.
    __PRODUCTION__: true,
    __SERVER__: true,
  },
  
}



export default options;
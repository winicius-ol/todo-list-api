const { createDefaultPreset } = require("ts-jest");
const { pathsToModuleNameMapper } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

// Define paths manually to match tsconfig.json
const paths = {
  "@/*": ["src/*"],
  "@test/*": ["tests/*"]
};

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>/' }),
};

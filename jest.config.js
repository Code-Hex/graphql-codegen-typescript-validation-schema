const { resolve } = require("path");
const { pathsToModuleNameMapper } = require("ts-jest");

const pkg = require("./package.json");
const tsconfig = require("./tsconfig.json");
const CI = !!process.env.CI;

module.exports = () => {
  return {
    displayName: pkg.name,
    rootDir: __dirname,
    preset: "ts-jest",
    testEnvironment: "node",
    restoreMocks: true,
    reporters: ["default"],
    modulePathIgnorePatterns: ["dist"],
    moduleNameMapper: pathsToModuleNameMapper(
      tsconfig.compilerOptions.paths || [],
      {
        prefix: `./`,
      }
    ),
    cacheDirectory: resolve(
      __dirname,
      `${CI ? "" : "node_modules/"}.cache/jest`
    ),
    collectCoverage: false,
  };
};

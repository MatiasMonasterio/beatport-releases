/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type { Config } from "jest";

const config: Config = {
  displayName: "root",
  projects: [
    "<rootDir>/workspaces/client/jest.config.ts",
    "<rootDir>/workspaces/server/jest.config.ts",
  ],
};

export default config;

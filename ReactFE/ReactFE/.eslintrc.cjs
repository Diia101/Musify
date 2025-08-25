module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:cypress/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: [
    "dist",
    "commitlint.config.js",
    ".eslintrc.cjs",
    ".lintstagedrc.js",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "17.0.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};

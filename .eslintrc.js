module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    "vue/setup-compiler-macros": true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    project: ["./tsconfig.json"],
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:vue/base",
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-typescript",
    "plugin:prettier/recommended",
    "prettier",
  ],
  rules: {
    "no-irregular-whitespace": [
      "error",
      {
        skipStrings: true,
        skipComments: true,
        skipRegExps: true,
        skipTemplates: true,
      },
    ],
    curly: ["error", "multi-line"],
    eqeqeq: ["warn", "always"],
    "vue/script-setup-uses-vars": "error",

    "@typescript-eslint/no-unsafe-member-access": "off",

    "prettier/prettier": 1,
  },
};

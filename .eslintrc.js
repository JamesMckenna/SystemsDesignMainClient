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
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
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
    eqeqeq: ["error", "always"],
    "vue/script-setup-uses-vars": "error",
    "prettier/prettier": 1,
  },
};

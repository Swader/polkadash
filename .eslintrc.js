module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "no-console": 0,
  },
};

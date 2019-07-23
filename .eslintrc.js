module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "@nuxtjs", "plugin:vue/recommended", "plugin:prettier/recommended"
  ],
  plugins: [
    "import", "vue",'prettier'
  ],
  // add your custom rules here
  rules: {
    eqeqeq: "off",
    "arrow-parens": 0,
    "no-console": "off",
    "no-param-reassign": "off",
    "import/no-extraneous-dependencies": "off",
    "prettier/prettier": "error"
  }
}

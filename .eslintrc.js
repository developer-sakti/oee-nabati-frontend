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
    'prettier/vue',
    'plugin:prettier/recommended',
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    eqeqeq: "off",
    "arrow-parens": 2,
    "no-console": "off",
    "no-param-reassign": "off",
    "import/no-extraneous-dependencies": "off",
    "prettier/prettier": "error"
  }
}

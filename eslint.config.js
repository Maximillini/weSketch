import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {
    languageOptions: { globals: {...globals.browser, ...globals.node} }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ["**/*.jsx", "**/*.tsx", "**/*.js", "**/*.ts"], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } }, },
  {
    ...pluginReactConfig,
    rules: {
      ...pluginReactConfig.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off", // Disable the rule globally
      // Add other rules as needed
    },
  },
  {
    ignores: ["**/dist/"]
  }
];

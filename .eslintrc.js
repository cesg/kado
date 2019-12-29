module.exports = {
    "extends": ["plugin:vue/recommended", "plugin:prettier/recommended"],
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2019,
        "sourceType": "module"
    },
    "plugins": ["prettier", "vue"],
    "rules": {
        "vue/no-v-html": ["warn"],
        "prettier/prettier": ["error", {
            "printWidth": 150,
            "tabWidth": 2,
            "useTabs": false,
            "semi": true,
            "singleQuote": true,
            "trailingComma": "es5"
        }]
    }
};

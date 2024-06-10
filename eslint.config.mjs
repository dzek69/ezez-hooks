import { readFile } from "fs/promises";

import { getEslintConfig } from "@ezez/eslint";
import reactHooks from "eslint-plugin-react-hooks";
import { fixupPluginRules } from "@eslint/compat";

const packageJson = JSON.parse(String(await readFile("./package.json")));
const react = Boolean(packageJson.libraryTemplate?.jsx);

const config = getEslintConfig({ react });
config.push({
    files: ["src/demos/**/*"],
    rules: {
        "react/jsx-no-bind": "off",
    },
});
config.push({
    files: ["src/pages/**/*"],
    rules: {
        "import/no-default-export": "off",
    },
});

config.push({
    plugins: {
        "react-hooks": fixupPluginRules(reactHooks),
    },
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
    },
});

export default config;

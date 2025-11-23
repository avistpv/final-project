import globals from 'globals'
import tseslint from 'typescript-eslint'
import {baseConfig} from "./base.js"

type FlatConfig = Awaited<ReturnType<typeof tseslint.config>>[number];

export const nodeConfig: FlatConfig[] = [
    ...baseConfig,
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 2020,
            globals: {
                ...globals.node,
            },
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-non-null-assertion': 'warn',
        },
    },
]

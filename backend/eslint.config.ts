import { nodeConfig } from '../shared/eslint-config';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default [
    ...nodeConfig,
    {
        files: ['src/**/*.{ts,js}'],
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: join(__dirname, '..'),
                projectService: true,
            },
        },
    },
    {
        files: ['tests/**/*.{ts,js}'],
        languageOptions: {
            parserOptions: {
                project: false,
            },
        },
    },
];


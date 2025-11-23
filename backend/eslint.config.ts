import {nodeConfig} from '../shared/eslint-config';
import {join} from 'path';
import {fileURLToPath} from 'url';
import tseslint from 'typescript-eslint';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

type FlatConfig = Awaited<ReturnType<typeof tseslint.config>>[number];

const config: FlatConfig[] = [
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

export default config;


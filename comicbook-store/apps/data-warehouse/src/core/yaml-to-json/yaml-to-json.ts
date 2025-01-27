import { readFileSync } from 'fs';
import { parse } from 'yaml';

export const yamlToJson = (path: string): Record<string, string> => {
    const yaml = readFileSync(path, 'utf8');
    return parse(yaml) as Record<string, string>;
};

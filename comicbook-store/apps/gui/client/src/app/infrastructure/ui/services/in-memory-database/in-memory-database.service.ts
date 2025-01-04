import { InMemoryDbService, ParsedRequestUrl, RequestInfoUtilities } from 'angular-in-memory-web-api';
import brandings from './brandings.json';

export class InMemoryDatabaseService implements InMemoryDbService {
    public createDb() {
        return {
            'data-warehouse-brandings': brandings
        };
    }

    public parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
        const urlMatchesPattern = this.#matchUrl(url);
        if (urlMatchesPattern(/^\/data-warehouse\/brandings$/u)) {
            return utils.parseRequestUrl(`data-warehouse-brandings`);
        }
        return utils.parseRequestUrl(url);
    }

    #matchUrl(url: string): (pattern: RegExp) => boolean {
        return (pattern: RegExp) => Boolean(pattern.exec(url));
    }
}

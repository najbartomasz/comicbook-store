import { InMemoryDbService, ParsedRequestUrl, RequestInfoUtilities } from 'angular-in-memory-web-api';
import brandings from './brandings.json';
import brandingDetails from './branding-details.json';

export class InMemoryDatabaseService implements InMemoryDbService {
    public createDb(): object {
        return {
            brandings,
            brandingDetails
        };
    }

    public parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
        if (new RegExp(/^\/api\/brandings\/\d+$/u, 'u').exec(url)) {
            const brandingId = Number(url.split('/').pop());
            return utils.parseRequestUrl(`/api/brandingDetails/${brandingId}`);
        }
        return utils.parseRequestUrl(url);
    }
}

import { ComicBookBrandingDto } from '@api/dtos/comicbook-branding.dto';
import { HttpClient } from '@api/interfaces/http-client.interface';
import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { BrandingRepository } from '@feature/interfaces/api/branding-repository.interface';
import { Logger, LoggerFactory } from '@lib/logger';
import { Observable, tap } from 'rxjs';

export class BrandingNetworkService implements BrandingRepository {
    readonly #logger: Logger;
    readonly #httpClient: HttpClient;

    public constructor(loggerFactory: LoggerFactory, httpClient: HttpClient) {
        this.#logger = loggerFactory.createLogger('BrandingNetworkService');
        this.#httpClient = httpClient;
    }

    public getBrandings(): Observable<ComicBookBranding[]> {
        return this.#httpClient.get<ComicBookBrandingDto[]>('/brandings')
            .pipe(
                tap((brandings) => {
                    this.#logger.info(`ComicBook brandings received: ${JSON.stringify(brandings)}`);
                })
            );
    }
}

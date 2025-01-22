import { apiRouter } from '@infrastructure/router';
import { Logger, LoggerFactory } from '@lib';
import { Application } from 'express';
import fs from 'fs';
import https, { Server as NetServer } from 'https';
import { brandingRouter } from 'infrastructure/routers/branding/branding.router';
import path from 'path';
import { App } from './app';
import { ServerOptions } from './server-options.model';

export class Server {
    readonly #logger: Logger;

    public constructor() {
        this.#logger = new LoggerFactory().createLogger('Server');
    }

    public start({ port }: ServerOptions): NetServer {
        const app = this.#buildApp();
        const certs = this.#loadCerts();
        return https
            .createServer(certs, app)
            .listen(port, () => {
                this.#logger.info(`Up and running at: https://localhost:${port}`);
            });
    }

    #loadCerts() {
        return {
            key: fs.readFileSync(path.join(__dirname, './certs/key.pem')),
            cert: fs.readFileSync(path.join(__dirname, './certs/cert.pem'))
        }
    }

    #buildApp(): Application {
        return new App()
            .withCors()
            .withHelmet()
            .withJsonBodyParser()
            .withRouter(
                apiRouter,
                brandingRouter
            )
            .build();
    }
}

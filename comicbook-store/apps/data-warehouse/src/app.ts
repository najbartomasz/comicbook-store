import cors, { CorsOptions } from 'cors';
import express, { Application } from 'express';
import helmet, { HelmetOptions } from 'helmet';

export class App {
    readonly #app: Application;

    public constructor() {
        this.#app = express();
    }

    public withCors(options?: CorsOptions): this {
        this.#app.use(cors(options));
        return this;
    }

    public withHelmet(options?: HelmetOptions): this {
        this.#app.use(helmet(options));
        return this;
    }

    public withJsonBodyParser(): this {
        this.#app.use(express.json());
        return this;
    }

    public withRouter(...router: express.Router[]): this {
        this.#app.use('/v1', router);
        return this;
    }

    public build(): Application {
        return this.#app;
    }
}

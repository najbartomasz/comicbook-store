import { InMemoryDbService } from 'angular-in-memory-web-api';
import brandings from './brandings.json';

export class InMemoryDatabaseService implements InMemoryDbService {
    public createDb() {
        return {
            brandings
        };
    }
}

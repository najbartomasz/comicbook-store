export class DatabaseRepository {
    public query(): { id: number; name: string }[] {
        return [
            { id: 1, name: 'MARVEL NOW!' },
            { id: 2, name: 'MARVEL NOW! 2.0' },
            { id: 3, name: 'MARVEL FRESH' },
            { id: 4, name: 'MARVEL CLASSIC' },
            { id: 5, name: 'MARVEL LIMITED' },
            { id: 6, name: 'DC BLACK LABEL' }
        ];
    }
}

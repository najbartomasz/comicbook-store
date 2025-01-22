import { Request, Response } from 'express';
import { DatabaseRepository } from 'infrastructure/database/database.repository';

export const getAllBrandings = async (_: Request, res: Response) => {
    const db = new DatabaseRepository();
    res.send(db.query());
};

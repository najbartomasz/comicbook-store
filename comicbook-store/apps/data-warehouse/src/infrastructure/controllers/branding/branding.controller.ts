import { DatabaseRepository } from '@database';
import { Request, Response } from 'express';

export const getAllBrandings = async (_: Request, res: Response): Promise<void> => {
    const db = new DatabaseRepository();
    res.send(db.query());
};

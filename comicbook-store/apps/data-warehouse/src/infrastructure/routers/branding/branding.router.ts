import { getAllBrandings } from '@controller';
import { Router } from 'express';

const router = Router();

router.get('/brandings', getAllBrandings);

export { router as brandingRouter };

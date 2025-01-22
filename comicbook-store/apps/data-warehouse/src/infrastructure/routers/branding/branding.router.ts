import { Router } from 'express';
import { getAllBrandings } from 'infrastructure/controllers/branding/branding.controller';

const router = Router();

router.get('/brandings', getAllBrandings);

export { router as brandingRouter };

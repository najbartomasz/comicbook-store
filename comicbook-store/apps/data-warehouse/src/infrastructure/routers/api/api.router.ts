import { yamlToJson } from '@core';
import { Router } from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

const router = Router();

router.use('/api', swaggerUi.serve, swaggerUi.setup(yamlToJson(path.join(__dirname, 'api.yaml'))));

export { router as apiRouter };

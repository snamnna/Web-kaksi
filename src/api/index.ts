import express, {Request} from 'express';

import categoryRoute from './routes/categoryRoute';
import {MessageResponse, TypedResponse} from '../types/MessageTypes';

const router = express.Router();

router.get('/', (_req: Request, res: TypedResponse<MessageResponse>) => {
  res.json({
    message: 'animals api v1',
  });
});

router.use('/categories', categoryRoute);

export default router;

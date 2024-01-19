import express from 'express';

import categoryRoute from './routes/categoryRoute';
import {MessageResponse} from '../types/MessageTypes';
import speciesRoute from './routes/speciesRoute';
import animalRoute from './routes/animalRoute';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'animals api v1',
  });
});

router.use('/categories', categoryRoute);
router.use('/species', speciesRoute);
router.use('/animals', animalRoute);

export default router;

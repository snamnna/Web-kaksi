import express from 'express';
import {
  animalDelete,
  animalGet,
  animalListGet,
  animalPost,
  animalPut,
} from '../controllers/animalController';

const router = express.Router();

router.route('/').get(animalListGet).post(animalPost);

router.route('/:id').get(animalGet).put(animalPut).delete(animalDelete);

export default router;

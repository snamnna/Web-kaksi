import express from 'express';
import {
  animalDelete,
  animalGet,
  animalListGet,
  animalPost,
  animalPut,
} from '../controllers/animalController';
import {body, param} from 'express-validator';
import {validationErrors} from '../../middlewares';

const router = express.Router();

router
  .route('/')
  .get(param('id').isInt(), validationErrors, animalListGet)
  .post(
    body('animal_name').isString().notEmpty().escape(),
    body('birthdate').isDate(),
    body('species').isInt(),
    validationErrors,
    animalPost
  );

router
  .route('/:id')
  .get(param('id').isInt(), validationErrors, animalGet)
  .put(
    param('id').isInt(),
    body('animal_name').isString().notEmpty().escape(),
    body('birthdate').isDate().optional(),
    body('species').isInt().optional(),
    validationErrors,
    animalPut
  )
  .delete(param('id').isInt(), validationErrors, animalDelete);

export default router;

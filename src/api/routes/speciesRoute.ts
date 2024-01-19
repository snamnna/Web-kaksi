import express from 'express';
import {
  speciesDelete,
  speciesGet,
  speciesListGet,
  speciesPost,
  speciesPut,
} from '../controllers/speciesController';

const router = express.Router();

router.route('/').get(speciesListGet).post(speciesPost);

router.route('/:id').get(speciesGet).put(speciesPut).delete(speciesDelete);

router.get('/test', (req, res) => {
  res.send('Test route works!');
});

export default router;

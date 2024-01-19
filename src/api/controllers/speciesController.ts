import {Request, Response, NextFunction} from 'express';
import {
  getAllSpecies,
  getSpeciesById,
  addSpecies,
  updateSpecies,
  deleteSpecies,
} from '../models/speciesModel';

import {Species} from '../../types/DBTypes';
import {MessageResponse, PostMessage} from '../../types/MessageTypes';

const speciesGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<Species>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const species = await getSpeciesById(id);
    res.json(species);
  } catch (error) {
    next(error);
  }
};

const speciesListGet = async (
  req: Request<{}, {}, {}>,
  res: Response<Species[]>,
  next: NextFunction
) => {
  try {
    const speciesList = await getAllSpecies();
    res.json(speciesList);
  } catch (error) {
    next(error);
  }
};

const speciesPost = async (
  req: Request<{}, {}, Pick<Species, 'species_name'>>,
  res: Response<{message: string; id: number}>,
  next: NextFunction
) => {
  try {
    const newSpeciesId = await addSpecies(req.body);
    res.json({
      message: 'Species added',
      id: newSpeciesId,
    });
  } catch (error) {
    next(error);
  }
};

const speciesPut = async (
  req: Request<{id: string}, {}, Pick<Species, 'species_name'>>,
  res: Response<{message: string}>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    await updateSpecies(id, req.body);
    res.json({
      message: 'Species updated',
    });
  } catch (error) {
    next(error);
  }
};

const speciesDelete = async (
  req: Request<{id: string}>,
  res: Response<{message: string}>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    await deleteSpecies(id);
    res.json({
      message: 'Species deleted',
    });
  } catch (error) {
    next(error);
  }
};

export {speciesGet, speciesListGet, speciesPost, speciesPut, speciesDelete};

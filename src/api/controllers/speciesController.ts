import {Request, Response, NextFunction} from 'express';

const speciesGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send('speciesGet');
  } catch (error) {
    next(error);
  }
};

const speciesListGet = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send('speciesListGet');
  } catch (error) {
    next(error);
  }
};

const speciesPost = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send('speciesPost');
  } catch (error) {
    next(error);
  }
};

const speciesPut = async (
  req: Request<{id: string}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send('speciesPut');
  } catch (error) {
    next(error);
  }
};

const speciesDelete = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send('speciesDelete');
  } catch (error) {
    next(error);
  }
};

export {speciesGet, speciesListGet, speciesPost, speciesPut, speciesDelete};

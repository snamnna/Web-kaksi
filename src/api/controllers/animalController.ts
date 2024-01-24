import {Request, Response, NextFunction} from 'express';
import {
  addAnimal,
  deleteAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
} from '../models/animalModel';
import {Animal, FullAnimal} from '../../types/DBTypes';
import {MessageResponse, PostMessage} from '../../types/MessageTypes';
import {validationResult} from 'express-validator';
import CustomError from '../../classes/CustomError';

const animalListGet = async (
  req: Request,
  res: Response<FullAnimal[]>,
  next: NextFunction
) => {
  try {
    const animals = await getAllAnimals();
    res.json(animals);
  } catch (error) {
    next(error);
  }
};

const animalGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<FullAnimal>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const animal = await getAnimalById(id);
    res.json(animal);
  } catch (error) {
    next(error);
  }
};

const animalPost = async (
  req: Request<{}, {}, Omit<Animal, 'animal_id'>>,
  res: Response<PostMessage>,
  next: NextFunction
) => {
  const errors = validationResult(req); //Tästä voisi tehdä middlewaren
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => {
        return `${error.msg} in ${error.param}`;
      })
      .join(', ');
    next(new CustomError(messages, 400)); //Next ei pysäytä funktiota
    return;
  }
  try {
    const animalId = await addAnimal(req.body);
    res.send({
      message: 'Animal added',
      id: animalId,
    });
  } catch (error) {
    next(error); //Lähetetään virhettä eteenpäin middleware ketjussa
  }
};

const animalPut = async (
  req: Request<{id: string}, {}, Omit<Animal, 'animal_id'>>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    await updateAnimal(id, req.body);
    res.json({
      message: 'Animal updated',
    });
  } catch (error) {
    next(error);
  }
};

const animalDelete = async (
  req: Request<{id: string}>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    await deleteAnimal(id);
    res.json({
      message: 'Animal deleted',
    });
  } catch (error) {
    next(error);
  }
};

export {animalListGet, animalGet, animalPost, animalPut, animalDelete};

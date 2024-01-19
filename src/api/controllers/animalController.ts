import {Request, Response, NextFunction} from 'express';
import {
  addAnimal,
  deleteAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
} from '../models/animalModel';
import {Animal} from '../../types/DBTypes';
import {MessageResponse, PostMessage} from '../../types/MessageTypes';

const animalListGet = async (
  req: Request,
  res: Response<Animal[]>,
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
  res: Response<Animal>,
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
  req: Request<{}, {}, Pick<Animal, 'animal_name'>>,
  res: Response<PostMessage>,
  next: NextFunction
) => {
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
  req: Request<{id: string}, {}, Pick<Animal, 'animal_name'>>,
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

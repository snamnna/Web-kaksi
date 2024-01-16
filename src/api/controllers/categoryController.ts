import {Request, NextFunction} from 'express';
import {getAllCategories, getCategoryById} from '../models/categoryModel';
import {Category} from '../../types/DBTypes';
import {TypedResponse} from '../../types/MessageTypes';

const categoryListGet = async (
  req: Request,
  res: TypedResponse<Category[]>,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const categoryGet = async (
  req: Request<{id: string}, {}, {}>,
  res: TypedResponse<Category>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const category = await getCategoryById(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export {categoryListGet, categoryGet};

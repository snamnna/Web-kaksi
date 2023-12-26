import promisePool from '../../database/db';
import {Category} from '../../interfaces/Category';
import {RowDataPacket} from 'mysql2';

interface GetCategory extends RowDataPacket, Category {}


const getAllCategories = async () => {
  const [rows] = await promisePool.execute<GetCategory[]>(
    'SELECT * FROM categories'
  );
  if (!rows) {
    throw new Error('No categories found');
  }
  return rows as Category[];
};

const getCategoryById = async (id: number) => {
  const [rows] = await promisePool.execute<GetCategory[]>(
    'SELECT * FROM categories WHERE category_id = ?',
    [id]
  );
  if (!rows) {
    throw new Error('No categories found');
  }
  return rows[0] as Category;
};

export {getAllCategories, getCategoryById};

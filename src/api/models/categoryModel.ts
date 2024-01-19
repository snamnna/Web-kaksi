import promisePool from '../../database/db';
import {Category} from '../../types/DBTypes';
import {RowDataPacket} from 'mysql2';

const getAllCategories = async () => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Category[]>(
    'SELECT * FROM categories'
  );
  if (!rows) {
    throw new Error('No categories found'); //Type guard
  }
  return rows;
};

const getCategoryById = async (id: number) => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Category[]>(
    'SELECT * FROM categories WHERE category_id = ?',
    [id]
  );
  if (!rows) {
    throw new Error('No categories found');
  }
  return rows[0];
};

export {getAllCategories, getCategoryById};

import CustomError from '../../classes/CustomError';
import promisePool from '../../database/db';
import {Animal} from '../../types/DBTypes';
import {ResultSetHeader, RowDataPacket} from 'mysql2';

const getAllAnimals = async (): Promise<Animal[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Animal[]>(
    'SELECT * FROM animals'
  );
  if (!rows) {
    throw new CustomError('No animals found', 404); //Type guard
  }
  return rows;
};

const getAnimalById = async (id: number): Promise<Animal> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Animal[]>(
    'SELECT * FROM animals WHERE animal_id = ?',
    [id]
  );
  if (!rows) {
    throw new CustomError('No animals found', 404);
  }
  return rows[0];
};

const addAnimal = async (
  animal: Pick<Animal, 'animal_name'>
): Promise<number> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'INSERT INTO animals (animal_name, species_id, category_id) VALUES (?, ?, ?);',
    [animal.animal_name]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Animal not added', 400);
  }
  return headers.insertId;
};

const updateAnimal = async (
  id: number,
  animal: Pick<Animal, 'animal_name'>
): Promise<boolean> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'UPDATE animals SET animal_name = ?, species_id = ?, category_id = ? WHERE animal_id = ?',
    [animal.animal_name, id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Animal not updated', 304);
  }
  return true;
};

const deleteAnimal = async (id: number): Promise<boolean> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'DELETE FROM animals WHERE animal_id = ?',
    [id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Animal not deleted', 304);
  }
  return true;
};

export {getAllAnimals, getAnimalById, addAnimal, updateAnimal, deleteAnimal};

import { pool } from "../config/database.js";
const getAllCars = async(req, res) => {
    try{
        const result = await pool.query(`SELECT * FROM cars`);
        res.status(200).json(result.rows);
    }
    catch(error){
        res.status(504).json({error: error.message})
    }
}
const getCarById = async(req, res) => {
    try{
        const {id} = req.params;
        const result = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
        
        if (result.rows.length === 0){
            return res.status(404).json({ message: 'Car not found' });
        }

        res.json(result.rows[0]);
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}
const createCar = async(req, res) => {
    try{
        const { name, exterior_id, roof_id, wheels_id, interior_id, is_convertible, total_price } = req.body;
        const result = await pool.query(
            'INSERT INTO cars (name, exterior_id, roof_id, wheels_id, interior_id, is_convertible, total_price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, exterior_id, roof_id, wheels_id, interior_id, is_convertible, total_price]
        );
        res.status(201).json(result.rows[0]);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

const updateCar = async(req, res) => {
    try{
        const {id} = req.params;
        const { name, exterior_id, roof_id, wheels_id, interior_id, is_convertible, total_price } = req.body;
        const result = await pool.query(
            'UPDATE cars SET name = $1, exterior_id = $2, roof_id = $3, wheels_id = $4, interior_id = $5, is_convertible = $6, total_price = $7 WHERE id = $8 RETURNING *',
            [name, exterior_id, roof_id, wheels_id, interior_id, is_convertible, total_price, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }
        
        res.json(result.rows[0]);
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const deleteCar = async( req, res) => {
        try {
          const { id } = req.params;
          const result = await pool.query(
            "DELETE FROM cars WHERE id = $1 RETURNING *",
            [id]
          );

          if(result.rows.length === 0){
            return res.status(404).json({ message: "Car not found" });
          }

          res.json({ message: "Car deleted successfully" });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
}

export { getAllCars, getCarById, createCar, updateCar, deleteCar };
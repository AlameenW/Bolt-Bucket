import pool from "./database.js";

const createCarsTable = async () => {
  const createQuery = `
        CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        exterior_id INTEGER REFERENCES exterior_options(id),
        roof_id INTEGER REFERENCES roof_options(id),
        wheels_id INTEGER REFERENCES wheel_options(id),
        interior_id INTEGER REFERENCES interior_options(id),
        is_convertible BOOLEAN DEFAULT false,
        total_price DECIMAL(10,2),
    )
    `;
    try{
        const res = await pool.query(createQuery)
        console.log("Cars table created successfully");
    }
    catch(error){
        console.log('Error creating Cars table')
    }
};

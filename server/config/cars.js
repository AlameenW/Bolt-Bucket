import {pool} from "./database.js";
import carData from "../data/carData.js";
import dotenv from "./dotenv.js";
dotenv.config();
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
        total_price DECIMAL(10,2)
    )
    `;
  try {
    const res = await pool.query(createQuery);
    console.log("Cars table created successfully");
  } catch (error) {
    console.log("Error creating Cars table");
  }
};

const seedCarsTable = async () => {
  await createCarsTable();
  carData.forEach((car) => {
    const insertQuery = `
        INSERT INTO cars (name, exterior_id, roof_id, wheels_id, interior_id, is_convertible, total_price) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [
      car.name,
      car.exterior_id,
      car.roof_id,
      car.wheels_id,
      car.interior_id,
      car.is_convertible,
      car.total_price,
    ];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.log("Error inserting Car data", err);
        return;
      } else {
        console.log(`${car.name} added successfully`);
      }
    });
  });
};

seedCarsTable();

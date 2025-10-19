import { pool } from "./database.js";
import dotenv from "./dotenv.js";
import interiorOptionsData from "../data/interiorOptionsData.js";
dotenv.config();
const createInteriorOptionsTable = async () => {
  const createQuery = `
            CREATE TABLE IF NOT EXISTS interior_options (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            price DECIMAL(10,2),
            image_url VARCHAR(255)
        )
        `;
  try {
    const res = await pool.query(createQuery);
    console.log("🎉 interior_options table created successfully");
  } catch (error) {
    console.log("Error creating interior options table" + error);
  }
};
const seedInteriorOptionsTable = async () => {
  await createInteriorOptionsTable();
  interiorOptionsData.forEach((option) => {
    const insertQuery = {
      text: "INSERT INTO interior_options (name, price, image_url) VALUES ($1, $2, $3)",
    };
    const values = [option.name, option.price, option.image_url];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.log("Error inserting interior options data" + err);
        return;
      } else {
        console.log(`${option.name} added successfully`);
      }
    });
  });
};
seedInteriorOptionsTable();
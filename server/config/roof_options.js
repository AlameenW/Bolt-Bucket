import { pool } from "./database.js";
import dotenv from "./dotenv.js";
import roofOptionsData from "../data/roofOptionsData.js";
dotenv.config();
const createRoofOptionsTable = async () => {
  const createQuery = `
            CREATE TABLE IF NOT EXISTS roof_options (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            price DECIMAL(10,2),
            image_url VARCHAR(255)
        )
        `;
  try {
    const res = await pool.query(createQuery);
    console.log("🎉 roof_options table created successfully");
  } catch (error) {
    console.log("Error creating roof_options table");
  }
};

const seedRoofOptionsTable = async () => {
  await createRoofOptionsTable();
  roofOptionsData.forEach((option) => {
    const insertQuery = {
      text: "INSERT INTO roof_options (name, price, image_url) VALUES ($1, $2, $3)",
    };
    const values = [option.name, option.price, option.image_url];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.log("Error inserting roof options data" + err);
        return;
      } else {
        console.log(`${option.name} added successfully`);
      }
    });

  });
};

seedRoofOptionsTable();
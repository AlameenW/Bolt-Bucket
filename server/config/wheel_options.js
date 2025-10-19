import {pool} from "./database.js";
import wheelOptionsData from "../data/wheelOptionsData.js";
import dotenv from "./dotenv.js";
dotenv.config();
const createWheelOptionsTable = async () => {
  const createQuery = `
            CREATE TABLE IF NOT EXISTS wheel_options (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            price DECIMAL(10,2),
            image_url VARCHAR(255)
        )
        `;
  try {
    const res = await pool.query(createQuery);
    console.log("🎉 wheel options table created successfully");
  } catch (error) {
    console.log(`Error creating wheel_options table` + error);
  }
};

const seedWheelOptionsTable = async () => {
  await createWheelOptionsTable();
  wheelOptionsData.forEach((option) => {
    const insertQuery = {
      text: "INSERT INTO wheel_options (name, price, image_url) VALUES ($1, $2, $3)",
    };
    const values = [option.name, option.price, option.image_url];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.log("Error inserting wheel options data" + err);
        return;
      } else {
        console.log(`${option.name} added successfully`);
      }
    });
  });
};
seedWheelOptionsTable();
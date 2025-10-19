import { pool } from "./database.js";
import exteriorOptionsData from "../data/exteriorOptionsData.js";
import dotenv from "./dotenv.js";
dotenv.config();
const createExteriorOptionsTable = async () => {
  const createQuery = `
            CREATE TABLE IF NOT EXISTS exterior_options (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            price DECIMAL(10,2),
            image_url VARCHAR(255)
        )
        `;
  try {
    const res = await pool.query(createQuery);
    console.log("🎉 exterior_options table created successfully");
  } catch (error) {
    console.log("Error creating exterior_options table");
  }
};

const seedExteriorOptionsTable = async() => {
    await createExteriorOptionsTable();
    exteriorOptionsData.forEach((option) => {
    const insertQuery = {
      text: "INSERT INTO exterior_options (name, price, image_url) VALUES ($1, $2, $3)",
    };
    const values = [option.name, option.price, option.image_url];
    pool.query(insertQuery, values, (err, res) => {
        if (err){
            console.log('Error inserting exterior options data'+err);
            return;
        }
        else{
            console.log(`${option.name} added successfully`);
        }
    })
})
    
};

seedExteriorOptionsTable();

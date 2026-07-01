const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors()); 
app.use(express.json());

const productRoutes = require("./routes/productRoutes");

app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to FirstAI Backend");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
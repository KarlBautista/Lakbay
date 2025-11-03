const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = 3000;


app.use(express.json());
app.use(cors());
dotenv.config();

app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
})
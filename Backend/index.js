const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = 3000;



dotenv.config();

const userRoutes = require("./routes/usersRouter");
app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);

app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
})
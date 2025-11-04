const express = require("express");
const router = express.Router();
const { getFavorites, addToFavorites } = require("../controllers/usersController");

router.post("/get-favorites", getFavorites);
router.post("/add-to-favorites", addToFavorites);

module.exports = router;

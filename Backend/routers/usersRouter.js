const express = require("express");
const router = express.Router();
const { getFavorites, addToFavorites, deleteFromFavorites } = require("../controllers/usersController");

router.post("/get-favorites", getFavorites);
router.post("/add-to-favorites", addToFavorites);
router.delete("/delete-from-favorites", deleteFromFavorites)


module.exports = router;

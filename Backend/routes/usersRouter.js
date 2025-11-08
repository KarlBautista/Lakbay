const express = require("express");
const router = express.Router();
const { getFavorites, addToFavorites, deleteFromFavorites, addToSaved, getSaved } = require("../controllers/usersController");

router.post("/get-favorites", getFavorites);
router.post("/add-to-favorites", addToFavorites);
router.delete("/delete-from-favorites", deleteFromFavorites);
router.post("/add-to-saved", addToSaved);
router.post("/get-saved", getSaved);


module.exports = router;

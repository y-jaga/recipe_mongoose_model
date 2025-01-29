require("./db/db.connect");
const express = require("express");
const {
  addRecipe,
  getAllRecipses,
  getRecipeByTitle,
  getRecipeByAuthor,
  getRecipeByDifficulty,
  updateRecipeId,
  updateRecipeByTitle,
  deleteRecipeById
} = require("./controllers/index");

const app = express();

app.use(express.json());

//add a new recipe
app.post("/recipes", addRecipe);

//get all rescipes
app.get("/recipes", getAllRecipses);

//get recipe by title
app.get("/recipes/:title", getRecipeByTitle);

//get recipe by author
app.get("/recipes/author/:authorName", getRecipeByAuthor);

//get recipe by difficulty level
app.get("/recipes/difficulty/:difficulty", getRecipeByDifficulty);

//update recipe by id
app.put("/recipes/:recipeId", updateRecipeId);

//update a recipe by title
app.put("/recipes/title/:title", updateRecipeByTitle);

//delete a recipe by id
app.delete("/recipes/:recipeId", deleteRecipeById);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

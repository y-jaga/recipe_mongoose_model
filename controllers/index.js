const Recipe = require("../models/recipe.models");

const addRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    res.status(201).json({
      message: "New recipe added successfully",
      newRecipe: savedRecipe,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create recipe", error: error.message });
  }
};

const getAllRecipses = async (req, res) => {
  try {
    const allRecipes = await Recipe.find();

    if (allRecipes.length === 0) {
      return res.status(400).json({ message: "No recipe found." });
    }

    res.status(200).json({ recipes: allRecipes });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get all recipes", error: error.message });
  }
};

const getRecipeByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const recipe = await Recipe.find({ title });

    if (recipe.length === 0) {
      return res.status(400).json({ message: "No recipe found." });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get recipe by title", error: error.message });
  }
};

const getRecipeByAuthor = async (req, res) => {
  try {
    const authorName = req.params.authorName;
    const recipe = await Recipe.find({ author: authorName });

    if (recipe.length === 0) {
      return res
        .status(400)
        .json({ message: `No recipe found for author ${authorName}.` });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get recipe by author", error: error.message });
  }
};

const getRecipeByDifficulty = async (req, res) => {
  try {
    const difficulty = req.params.difficulty;
    const recipe = await Recipe.find({ difficulty });

    if (recipe.length === 0) {
      res
        .status(400)
        .json({ message: `No recipe found for difficulty ${difficulty}` });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get recipe by difficulty",
      error: error.message,
    });
  }
};

const updateRecipeId = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const dataToUpdate = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      dataToUpdate,
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(400).json({ message: "No recipe found for given id." });
    }

    res
      .status(201)
      .json({ message: "Recipe updated successfully", updatedRecipe });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get recipe", error: error.message });
  }
};

const updateRecipeByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const dataToUpdate = req.body;
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title },
      dataToUpdate,
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(400).json({ message: "Recipe not found." });
    }

    res
      .status(201)
      .json({ message: "Recipe successfully updated.", updatedRecipe });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update recipe by title",
      error: error.message,
    });
  }
};

const deleteRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(400).json({ message: "Recipe not found." });
    }

    res
      .status(200)
      .json({ message: "Recipe successfully deleted.", deletedRecipe });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete recipe", error: error.message });
  }
};

module.exports = {
  addRecipe,
  getAllRecipses,
  getRecipeByTitle,
  getRecipeByAuthor,
  getRecipeByDifficulty,
  updateRecipeId,
  updateRecipeByTitle,
  deleteRecipeById
};

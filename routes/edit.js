const SQLite3 = require('better-sqlite3');
const db = new SQLite3('./db/database.sqlite3');
let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let url = req.url;
  url = url.split('=');
  let rowNumber = url[1];
  let recipe = db.prepare(`SELECT * FROM recipes WHERE row=${rowNumber}`).get();
  let recipeName = recipe.recipe_name;
  let brewDate = recipe.date_brewed;
  let recipeProcess = recipe.recipe;
  let recipeNotes = recipe.notes;
  res.render('edit', {
    title: 'Edit a recipe',
    recipeName,
    brewDate,
    recipeProcess,
    recipeNotes,
    rowNumber
   });
});

module.exports = router;

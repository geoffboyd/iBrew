const SQLite3 = require('better-sqlite3');
const db = new SQLite3('./db/database.sqlite3');
let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let url = req.url;
  url = url.split('=');
  let search = url[1];
  console.log(req.url);
  let recipes = db.prepare(`SELECT * FROM recipes WHERE recipe_name LIKE '%${search}%'`).all();
  let recipeList = [];
  let tableHeaders = ['Recipe Name', 'Date Brewed', 'Recipe', 'Notes'];
  for (let recipe of recipes) {
    // make a new table row in the body for each recipe
    recipeList.push([recipe.recipe_name, recipe.date_brewed, recipe.recipe, recipe.notes, [`/edit?row=${recipe.row}`, 'fa-pen-to-square'], [`/delete?row=${recipe.row}`, 'fa-trash-can']])
  }
  res.render('search', {
    title: 'iBrew Search Results',
    tableHeaders,
    recipeList
 });
});

module.exports = router;

const SQLite3 = require('better-sqlite3');
const db = new SQLite3('./db/database.sqlite3');
let express = require('express');
let router = express.Router();

/* POST recipe deposit. */
router.post('/', function(req, res, next) {
  let addRecipe = db.prepare("INSERT INTO recipes (recipe_name, date_brewed, recipe, notes) VALUES (@recipe_name, @date_brewed, @recipe, @notes);");
  const dbObject = { recipe_name: req.body.recipe_name, date_brewed: req.body.date_brewed, recipe: req.body.recipe, notes: req.body.notes };
  addRecipe.run(dbObject);
  res.redirect('/success');
});

module.exports = router;

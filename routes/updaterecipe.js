const SQLite3 = require('better-sqlite3');
const db = new SQLite3('./db/database.sqlite3');
let express = require('express');
let router = express.Router();

/* POST recipe deposit. */
router.post('/', function(req, res, next) {
  let url = req.url;
  url = url.split('=');
  let row = url[1];
  let name = req.body.recipe_name;
  let brewDate = req.body.date_brewed;
  let recipe = req.body.recipe;
  let notes = req.body.notes;
  let updateRecipe = db.prepare(`UPDATE recipes SET recipe_name='${name}', date_brewed='${brewDate}', recipe='${recipe}', notes='${notes}' WHERE row=${row};`);
  updateRecipe.run();
  res.redirect('/success');
});

module.exports = router;

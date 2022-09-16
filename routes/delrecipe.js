const SQLite3 = require('better-sqlite3');
const db = new SQLite3('./db/database.sqlite3');
let express = require('express');
let router = express.Router();

/* DELETE recipe listing. */
router.get('/', function(req, res) {
  let url = req.url;
  url = url.split('=');
  let rowNumber = url[1];
  let removeRecipe = db.prepare(`DELETE FROM recipes WHERE row=${rowNumber};`);
  removeRecipe.run();
  res.redirect('/success');
});

module.exports = router;

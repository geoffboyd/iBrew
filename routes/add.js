let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('add', {
    title: 'Add a recipe',
   });
});

module.exports = router;

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let addRouter = require('./routes/add');
let searchRouter = require('./routes/search');
let manageRouter = require('./routes/manage');
let newRecipeRouter = require('./routes/newrecipe');
let successRouter = require('./routes/success');
let delRouter = require('./routes/delrecipe');
let editRouter = require('./routes/edit');
let updateRouter = require('./routes/updaterecipe');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/img', express.static(__dirname + '/public/images'));
app.use('/fa', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free')); // redirect for fontawesome

app.use('/', indexRouter);
app.use('/add', addRouter);
app.use('/search', searchRouter);
app.use('/manage', manageRouter);
app.use('/newrecipe', newRecipeRouter);
app.use('/success', successRouter);
app.use('/delete', delRouter);
app.use('/edit', editRouter);
app.use('/update', updateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

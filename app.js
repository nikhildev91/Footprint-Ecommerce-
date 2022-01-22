var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {create}= require('express-handlebars');
var bodyParser = require('body-parser');
const session = require('express-session')

var indexRouter = require('./routes/user/index');
var usersRouter = require('./routes/users');
var userSignupRouter = require('./routes/user/signup');
var userLoginRouter = require('./routes/user/login');
var adminRouter = require('./routes/admin/index');
var productsRouter = require('./routes/admin/products')


var database = require('./dataConfig/databaseConnection')

var app = express();
var fileUpload = require('express-fileupload');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const hbs = create({
  layoutsDir:`${__dirname}/views/layouts`,
  extname:`hbs`,
  defaultLayout:`layout`,
  partialsDir:`${__dirname}/views/partials`

});
app.engine('hbs',hbs.engine)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload())

app.use(session({secret:"Key", cookie:{maxAge:40000000}}));


app.use((req, res, next)=>{
 res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
 next()
})


database.connect((err)=>{
  if (err){
    console.log("connection error", err);
  }else{
    console.log("DataBase Connected");
  }
})




app.use('/admin', adminRouter);


app.use('/signup',userSignupRouter);
app.use('/login',userLoginRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/products',productsRouter);

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

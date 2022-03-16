const express = require('express');
const path = require('path');

const { mongoConfig } = require('./config');
const { config } = require('./config');

// Additional Express middleware
const logger = require('morgan');
const createError = require('http-errors');
// const errorHandler = require('errorhandler')
// -- opted to use 'http-errors' included in Express Generator @4.16.3
const passport = require('passport');

const { auth } = require('express-openid-connect');

// Imported express.Router() from './routes/
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const eatRouter = require('./routes/eatRouter');
const servicesRouter = require('./routes/servicesRouter');
const shopRouter = require('./routes/shopRouter');
const stayRouter = require('./routes/stayRouter');

const mongoose = require('mongoose');

const url = mongoConfig.mongoUrl;
const connect = mongoose.connect(
  url
  // , {
  // useCreateIndex: true, <-- option not supported as of Mongoose 6, default set to true
  // useFindAndModify: false, <-- option not supported as of Mongoose 6, default set to false
  // useNewUrlParser: true, <-- option now depricated as of Mongoose 6, default set to true
  // useUnifiedTopology: true, <-- option now depricated as of Mongoose 6, default set to true
  // }
);

connect.then(
  () => console.log('Connected correctly to server'),
  (err) => console.log(err)
);

const app = express();

app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    console.log(
      `Redirecting to: https://${req.hostname}:${app.get('secPort')}${req.url}`
    );
    res.redirect(
      301,
      `https://${req.hostname}:${app.get('secPort')}${req.url}`
    );
  }
});

// const hostname = 'localhost'; <-- no longer used
// const PORT = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const server = http.createServer(app);

app.use(passport.initialize());

app.use(auth(config));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.get('/', (req, res) => {
//   res.setHeader('Content-Type', 'text/plain');
//   res.status(200).send('Testing... Testing...');
// });

app.use(express.static(path.join(__dirname, 'public')));

// Assign routers to routes
app.use('/eat', eatRouter);
app.use('/services', servicesRouter);
app.use('/shop', shopRouter);
app.use('/stay', stayRouter);

// Catch 404 and forward to error handler -- included in Express Generator @4.16.1
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler function
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status = err.status || 500; // <--- TypeError: res.status is not a function
  res.render('error');
});

// app.listen(PORT, hostname, () => {
//   console.log(`Server is running at http://${hostname}:${PORT}/`);
// });

module.exports = app;

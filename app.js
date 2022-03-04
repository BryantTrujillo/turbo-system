const express = require('express');
const path = require('path');

const app = express();

// Additional Express middleware
const logger = require('morgan');
const createError = require('http-errors');
// const errorHandler = require('errorhandler')
// -- opted to use 'http-errors' included in Express Generator @4.16.3

// Imported express.Router() from './routes/
const eatRouter = require('./routes/eatRouter');
const servicesRouter = require('./routes/servicesRouter');
const shopRouter = require('./routes/shopRouter');
const stayRouter = require('./routes/stayRouter');

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/visitGirdwood';

const connect = mongoose.connect(url, {
  // useCreateIndex: true,
  // -- not supported
  // useFindAndModify: false,
  // -- not supported
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(
  () => console.log('Connected correctly to server'),
  (err) => console.log(err)
);

const hostname = 'localhost';
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));

// const server = http.createServer(app);

// Assign routers to routes
app.use('/eat', eatRouter);
app.use('/services', servicesRouter);
app.use('/shop', shopRouter);
app.use('/stay', stayRouter);

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send('Testing... Testing...');
});

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
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, hostname, () => {
  console.log(`Server is running at http://${hostname}:${PORT}/`);
});

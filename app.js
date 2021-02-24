require('dotenv').config({ path: './config/config.env' });
require('./config/db.js')();

const express = require('express');
const exphbs = require('express-handlebars')({
  defaultLayout: 'main.hbs',
  extname: 'hbs',
});
const expressSession = require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: 0,
  saveUninitialized: 0,
});

const passport = require('passport');
// require('./config/passport.js')(passport);

const app = express();
if (process.env.NODE_ENV === 'development') app.use(require('morgan')('dev'));

app.engine('hbs', exphbs);
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use(expressSession);
app.use(passport.initialize);
app.use(passport.session);

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} & listening for requests.`
  );
});

//morgan for login
//-moment to format dates
//-connect-mongo to allow us to store sessions in database so that when server is reset, we're not logged out
//-method-override to allow us to make PUT, DELETE in templates too (by default only GET, POST)

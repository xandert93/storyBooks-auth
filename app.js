require('dotenv').config({ path: './config/config.env' });
require('./config/db.js')();

const express = require('express');
const exphbs = require('express-handlebars')({
  helpers: require('./helpers/hbs.js'),
  defaultLayout: 'main.hbs',
  extname: 'hbs',
});
const MongoStore = require('connect-mongo').default;
const expressSession = require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: 0,
  saveUninitialized: 0,
  store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
});
const methodOverride = require('method-override');

const passport = require('passport');
require('./config/passport-config')(passport);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
if (process.env.NODE_ENV === 'development') app.use(require('morgan')('dev'));

app.engine('hbs', exphbs);
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use('/', require('./routers/indexRouter'));
app.use('/auth', require('./routers/authRouter'));
app.use('/stories', require('./routers/storiesRouter'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} & listening for requests.`
  );
});

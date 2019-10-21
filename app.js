require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const User = require('./models/user');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const seedPosts = require('./seeds');
// seedPosts(); //seeding the page with 600 posts
// require routes

const indexRouter = require('./routes/index');
const reviewsRouter = require('./routes/reviews');
const postsRouter = require('./routes/posts');


const app = express();
// connect to the database
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/surf_shop', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('we\'re connected!');
});
// view engine setup
app.engine('ejs', engine); //for ejs-mate
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//set public assets directory
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// configure Passport and Session
app.use(session({
    secret: 'minh nguyen', 
    resave: false, 
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy()); // CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// title middleware (pre route)
app.use((req,res,next) => {
    res.locals.title = 'Surf Shop';
    //manually set the current user
    // req.user = {
    //     '_id' : '5da50b0918d5e703738468a0', //meatball
    //     'username' : 'meatball'
    //     // '_id' : '5da63820d07ddc0181a81eb0', //meatball2
    //     // 'username' : 'meatball2'
    //     // '_id' : '5da8e9c3a7afdb015f5b3f08', //meatball3
    //     // 'username' : 'meatball3'
    // }
    res.locals.currentUser = req.user;
    // set success flash message
    res.locals.success = req.session.success || '';
    delete req.session.success;
    // set error flash message
    res.locals.error = req.session.error || '';
    delete req.session.error;
    //continue on to next function in middleware chain
    next();
});
// Mount Routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => { // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // // render the error page
    // res.status(err.status || 500);
    // res.render('error');
    console.log(err);
    req.session.error = err.message;
    res.redirect('back');
});


module.exports = app;

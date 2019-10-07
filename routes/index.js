const express = require('express');
const router = express.Router();
const passport = require('passport');
const {postRegister} = require('../controllers/index');
const {errorHandler} = require('../middleware/index');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Surf Shop - Home' });
});

router.get('/register', (req, res, next) => {
  res.send('GET /register');
});
router.post('/register', errorHandler(postRegister));

router.get('/login', (req, res, next) => {
  res.send('GET /login');
});
router.post('/login', passport.authenticate('local',
          { 
            successRedirect: '/',
            failureRedirect: '/login' 
          }
));

router.get('/profile', (req, res, next) => {
  res.send('GET /profile');
});
router.put('/profile/:user_id', (req, res, next) => {
  res.send('PUT /profile/:user_id');
});

// get /forgot-password
router.get('/forgot', (req,res,next)=>{
  res.send('GET /forgot');
});
// put /forgot-password
router.put('/forgot', (req,res,next)=>{
  res.send('put /forgot');
});

router.get('/reset/:token', (req,res,next)=>{
  res.send('get /forgot/:token');
});
router.put('/reset/:token', (req,res,next)=>{
  res.send('put /forgot/:token');
});


module.exports = router;

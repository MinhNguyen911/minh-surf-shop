const express = require('express');
const router = express.Router();
const {
    landingPage,
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    getLogout
} = require('../controllers/');
const {
    asyncErrorHandler,
    checkIfUserExists
} = require('../middleware/');
/* GET home/landing page. */
router.get('/', asyncErrorHandler(landingPage));

router.get('/register', getRegister);
router.post('/register', asyncErrorHandler(postRegister));

router.get('/login', getLogin);
router.post('/login', asyncErrorHandler(postLogin));
router.get('/logout', getLogout);
router.get('/profile', (req, res, next) => {
    res.send('GET /profile');
});
router.put('/profile/:user_id', (req, res, next) => {
    res.send('PUT /profile/:user_id');
});

// get /forgot-password
router.get('/forgot', (req, res, next) => {
    res.send('GET /forgot');
});
// put /forgot-password
router.put('/forgot', (req, res, next) => {
    res.send('put /forgot');
});

router.get('/reset/:token', (req, res, next) => {
    res.send('get /forgot/:token');
});
router.put('/reset/:token', (req, res, next) => {
    res.send('put /forgot/:token');
});


module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer'); // this package is for dealing with data from our form
//to upload onto the cloud (cloudinary)
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage });
// dont need to specify what file if the name is index.js
const { asyncErrorHandler, isLoggedIn, isAuthor } = require('../middleware');
const
{
    postIndex,
    postNew,
    postCreate,
    postShow,
    postEdit,
    postUpdate,
    postDestroy
} = require('../controllers/posts');

/* GET posts index /posts */
router.get('/', asyncErrorHandler(postIndex));

/* GET posts new /posts/new */
router.get('/new', isLoggedIn, postNew);

/* POST posts create /posts/ */
router.post('/', isLoggedIn, upload.array('images',4), asyncErrorHandler(postCreate));

/* GET posts show /posts/:id */
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit',isLoggedIn, asyncErrorHandler(isAuthor), postEdit);

/* PUT posts update/posts/:id */
router.put('/:id',isLoggedIn, asyncErrorHandler(isAuthor), upload.array('images',4), asyncErrorHandler(postUpdate));


/* DELETE posts destroy /posts/:id */
router.delete('/:id',isLoggedIn, asyncErrorHandler(isAuthor), asyncErrorHandler(postDestroy));


module.exports = router;

/*
RESTFUL ROUTES REVIEW HERE
GET index        /posts
GET new          /posts/new
POST create      /posts
GET show         /posts/:id
GET edit         /posts/:id/edit
PUT update       /posts/:id
DELETE destroy   /posts/:id
*/

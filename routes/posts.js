const express = require('express');
const router = express.Router();
const multer = require('multer'); // this package is for dealing with data from our form
//to upload onto the cloud (cloudinary)
const upload = multer({'dest': 'uploads/'});
// dont need to specify what file if the name is index.js
const { asyncErrorHandler } = require('../middleware');
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
router.get('/new', postNew);

/* POST posts create /posts/ */
router.post('/', upload.array('images',4), asyncErrorHandler(postCreate));

/* GET posts show /posts/:id */
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* GET posts update/posts/:id */
router.put('/:id', upload.array('images',4), asyncErrorHandler(postUpdate));


/* GET posts destroy /posts/:id */
router.delete('/:id', asyncErrorHandler(postDestroy));


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

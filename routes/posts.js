const express = require('express');
const router = express.Router();
// dont need to specify what file if the name is index.js
const {errorHandler} = require('../middleware');
const {getPosts, newPost} = require('../controllers/posts');
/* GET posts index /posts */
router.get('/', errorHandler(getPosts));
/* GET posts new /posts/new */
router.get('/new', newPost);
/* GET posts create /posts/ */
router.post('/', (req, res, next) => {
    res.send('CREATE /posts')
});
/* GET posts show /posts/:id */
router.get('/:id', (req, res, next) => {
    res.send('SHOW /posts')
});
/* GET posts edit /posts/:id/edit */
router.get('/:id/edit', (req, res, next) => {
    res.send('EDIT /posts/:id/edit')
});
/* GET posts update/posts/:id */
router.put('/:id', (req, res, next) => {
    res.send('UPDATE /posts/:id ')
});
/* GET posts destroy /posts/:id */
router.delete('/:id', (req, res, next) => {
    res.send('DESTROY /posts/:id ')
});


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

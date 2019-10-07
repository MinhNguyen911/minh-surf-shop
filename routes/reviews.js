const express = require('express');
const router = express.Router({mergeParams: true});

/* GET reviews index /posts/:id/reviews */
router.get('/', (req, res, next) => {
    res.send('INDEX /posts/:id/reviews')
  });
/* GET reviews new /posts/:id/reviews/new */  
// router.get('/new', (req, res, next) => {
//     res.send('NEW /posts/:id/reviews/new')
//   });
/* GET reviews create /posts/:id/reviews/ */  
router.post('/', (req, res, next) => {
    res.send('CREATE /posts/:id/reviews')
  });
/* GET reviews show /posts/:id/reviews/:review_id */  
// router.get('/:review_id', (req, res, next) => {
//     res.send('SHOW /posts/:id/reviews')
//   });
 /* GET reviews edit /posts/:id/reviews/:review_idid/edit */  
router.get('/:review_id/edit', (req, res, next) => {
    res.send('EDIT /posts/:id/reviews/:review_id/edit')
  });
/* GET reviews update /posts/:id/reviews/:review_id */   
router.put('/:review_id', (req, res, next) => {
    res.send('UPDATE /posts/:id/reviews/:review_id ')
  });
 /* GET reviews destroy /posts/:id/reviews/:review_id */  
router.delete('/:review_id', (req, res, next) => {
    res.send('DESTROY /posts/:id/reviews/:review_id ')
  });
  



module.exports = router;
/*
RESTFUL ROUTES REVIEW HERE
GET index        /reviews
GET new          /reviews/new
POST create      /reviews
GET show         /reviews/:id
GET edit         /reviews/:id/edit
PUT update       /reviews/:id
DELETE destroy   /reviews/:id
*/
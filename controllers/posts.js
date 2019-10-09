const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name:'davmywtov',
    api_key:'615169188182619',
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = { // Posts Index
    async postIndex(req, res, next)
    {
        let posts = await Post.find(
            {}
        );
        res.render('posts/index',
        {
            posts
        });
    },

// Posts New
    postNew(req, res, next)
    {
        res.render('posts/new');
    },

// Posts Create
    async postCreate(req, res, next)
    { 
        req.body.post.images=[];
        for (const file of req.files){
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }
        // use req.body to create a new Post
        let post = await Post.create(req.body.post);
        res.redirect(`/posts/${
            post.id
        }`);
    },
    async postShow(req, res, next)
    {
        let post = await Post.findById(req.params.id);
        res.render('posts/show',
        {
            post
        });
    },
    async postEdit(req, res, next)
    {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit',
        {
            post
        });
    },
    async postUpdate(req, res, next)
    {
        //find the post by id
        let post = await Post.findById(req.params.id);
        //check if there's any images for deletion
        if (req.body.deleteImages && req.body.deleteImages.length){
            let deleteImages = req.body.deleteImages;
            // loop over deleteImages and delete images from both cloudinary and post.images
            for (const public_id of deleteImages){
                await cloudinary.v2.uploader.destroy(public_id);
                for (const image of post.images){
                    if(image.public_id === public_id){
                        let index = post.images.indexOf(image);
                        post.images.splice(index,1) ; //delete that image
                    }
                }
            }
            
        }
        // check if there's any new images for upload
        if(req.files){
            for (const file of req.files){
                let image = await cloudinary.v2.uploader.upload(file.path);
                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });
            }
        }
        //update the post with new properties
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.location = req.body.post.location;
        post.price = req.body.post.price;
        //save the updated post into the db
        post.save();
        res.redirect(`/posts/${post.id}`); //or req.params.id
    },
    async postDestroy(req,res,next){
        let post = await Post.findById(req.params.id);
        for(const image of post.images){
            await cloudinary.v2.uploader.destroy(image.public_id);
        }
        await Post.deleteOne(post);
        res.redirect('/posts');
    }
}

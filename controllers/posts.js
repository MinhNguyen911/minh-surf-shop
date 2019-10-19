require('dotenv').config();
const Post = require('../models/post');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({
    accessToken: mapBoxToken
});
const {
    cloudinary
} = require('../cloudinary');

module.exports = { // Posts Index
    async postIndex(req, res, next) {
        let posts = await Post.paginate({}, {
            page: req.query.page || 1,
            limit: 10,
            sort: {
                '_id': -1
            }
        });
        posts.page = Number(posts.page);
        res.render('posts/index', {
            posts,
            mapBoxToken,
            title: 'Posts Index'
        });
    },

    // Posts New
    postNew(req, res, next) {
        res.render('posts/new');
    },

    // Posts Create
    async postCreate(req, res, next) {
        // upload new image here
        req.body.post.images = [];
        for (const file of req.files) {
            req.body.post.images.push({
                url: file.secure_url,
                public_id: file.public_id
            });
        }
        // geocode the new input location
        let response = await geocodingClient.forwardGeocode({
                query: req.body.post.location,
                limit: 1
            })
            .send();
        req.body.post.geometry = response.body.features[0].geometry;
        // use req.body to create a new Post
        let post = new Post(req.body.post);
        post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.description.substring(0, 20)}...</p>`;
        await post.save();
        req.session.success = 'Post created successfully';
        res.redirect(`/posts/${
            post.id
        }`);
    },
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id).populate({
            path: 'reviews',
            options: {
                sort: {
                    '_id': -1
                }
            },
            populate: {
                path: 'author',
                model: 'User'
            }
        });
        const floorRating = post.calculateAvgRating();
        res.render('posts/show', {
            post,
            floorRating
        });
    },
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', {
            post
        });
    },
    async postUpdate(req, res, next) {
        //find the post by id
        let post = await Post.findById(req.params.id);
        //check if there's any images for deletion
        if (req.body.deleteImages && req.body.deleteImages.length) {
            let deleteImages = req.body.deleteImages;
            // loop over deleteImages and delete images from both cloudinary and post.images
            for (const public_id of deleteImages) {
                await cloudinary.v2.uploader.destroy(public_id); //delete from the cloud
                for (const image of post.images) { //delete from the post
                    if (image.public_id === public_id) {
                        let index = post.images.indexOf(image);
                        post.images.splice(index, 1); //delete that image
                    }
                }
            }

        }
        // check if there's any new images for upload
        if (req.files) {
            for (const file of req.files) {
                post.images.push({
                    url: file.secure_url,
                    public_id: file.public_id
                });
            }
        }
        if (req.body.post.location !== post.location) {
            let response = await geocodingClient.forwardGeocode({
                    query: req.body.post.location,
                    limit: 1
                })
                .send();
            post.geometry = response.body.features[0].geometry;
            post.location = req.body.post.location;
        }
        //update the post with new properties
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
        post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.description.substring(0, 20)}...</p>`;
        //save the updated post into the db
        await post.save();
        req.session.success = 'Post edited successfully';
        res.redirect(`/posts/${post.id}`); //or req.params.id
    },
    async postDestroy(req, res, next) {
        let post = await Post.findById(req.params.id);
        for (const image of post.images) {
            await cloudinary.v2.uploader.destroy(image.public_id);
        }
        await post.remove();
        req.session.success = 'Post deleted successfully';
        res.redirect('/posts');
    }
}
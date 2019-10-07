const User = require('../models/user'); 
module.exports ={
    async postRegister(req,res,next){
        try{
            console.log('registering user');
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                image: req.body.image
            });
            await User.register(newUser, req.body.password)
            console.log('user registered!');
            res.redirect('/');
        } catch(err){
            console.log('error while user register!', err);
            return next(err);
        }
        
    }
};
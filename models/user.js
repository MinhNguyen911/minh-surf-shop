const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    image: String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',UserSchema);
/*User:
-email: string
-password: string // this is handled by passport-local-mongoose
-profile pic
-posts: array of objects ref Post
-reviews: array of objects ref Review
*/
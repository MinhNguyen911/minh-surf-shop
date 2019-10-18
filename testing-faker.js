require('dotenv').config();
const faker = require('faker');
const Post = require('./models/post');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({
    accessToken: process.env.MAPBOX_TOKEN
});
const test_location = `${faker.address.city()}, ${faker.address.country()}`;
const coordinates= [Number(faker.address.longitude()), Number(faker.address.latitude())];
console.log(coordinates);



// post.coordinates = response.body.features[0].geometry.coordinates;
// console.log(post.coordinates);
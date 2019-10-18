const faker = require('faker');
const Post = require('./models/post');

async function seedPosts() {
	await Post.remove({});
	for(let i = 0; i<40; i++) {
		const post = {
			title: faker.lorem.word(),
			price: faker.commerce.price(),
			description: faker.lorem.text(),
			location : `${faker.address.city()}, ${faker.address.country()}`,
			coordinates: [Number(faker.address.longitude()), Number(faker.address.latitude())],
			author:{
                '_id' : '5da50b0918d5e703738468a0',
                'username' : 'meatball'
            }
		}
		await Post.create(post);
	}
	console.log('40 new posts created');
}

module.exports = seedPosts;
const mongoose = require('mongoose');

// Book Schema
const bookSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	genre:{
		type: String,
		required: true
	},
	author:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	publisher:{
		type: String
	},
	pages:{
		type: String
	},
	image_url:{
		type: String
	},
	price:{
		type: Number
	},
	create_date:{
		type: Date,
		default: Date.now
	},
	discount: {
		type: Number
	},
	overdiscount: {
		type: String
	},
	shape: {
		type: String
	},
	height: {
		type: String
	},
	capacity: {
		type: String
	},
	propeller: {
		type: String
	}, 
	winspeed: {
		type: String
	},
	controller: {
		type: String
	},
	description1:{
		type: String
	},
	description2:{
		type: String
	},
	description3:{
		type: String
	},
	image_url1: {
		type: String
	},
	image_url2: {
		type: String
	},
	image_url3: {
		type: String
	},
	image_url4: {
		type: String
	}
	
});

const Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = (callback, limit) => {
	Book.find(callback).limit(limit);
}

// Get Book
module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
}

// Add Book
module.exports.addBook = (book, callback) => {
	Book.create(book, callback);
}

// Update Book
module.exports.updateBook = (id, book, options, callback) => {
	var query = {_id: id};
	var update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		image_url: book.image_url,
		price: book.price,
		discount: book.discount,
		overdiscount: book.overdiscount,
		shape: book.shape,
		height: book.height,
		capacity: book.capacity,
		propeller: book.propeller,
		winspeed: book.winspeed,
		controller: book.controller,
		description1: book.description1,
		description2: book.description2,
		description3: book.description3,
		image_url1: book.image_url1,
		image_url2: book.image_url2,
		image_url3: book.image_url3,
		image_url4: book.image_url4

	}
	Book.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.removeBook = (id, callback) => {
	var query = {_id: id};
	Book.remove(query, callback);
}

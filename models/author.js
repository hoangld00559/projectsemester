const mongoose = require('mongoose');

// Book Schema
const authorSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	description1:{
		type: String
	},
	description2:{
		type: String
	},
	image_url1: {
		type: String
	},
	image_url2: {
		type: String
	}
});

const Author = module.exports = mongoose.model('Author', authorSchema);

// Get Authors
module.exports.getAuthors = (callback, limit) => {
	Author.find(callback).limit(limit);
}

// Get Book
module.exports.getAuthorById = (id, callback) => {
	Author.findById(id, callback);
}

// Add Book
module.exports.addAuthor = (author, callback) => {
	Author.create(author, callback);
}

// Delete Book
module.exports.removeAuthor = (id, callback) => {
	var query = {_id: id};
	Author.remove(query, callback);
}

// Update Book
module.exports.updateAuthor = (id, author, options, callback) => {
	var query = {_id: id};
	var update = {
		title: author.title,
		description: author.description,
		description1: author.description1,
		description2: author.description2,
		image_url1: author.image_url1,
		image_url2: author.image_url2,
	}
	Author.findOneAndUpdate(query, update, options, callback);
}

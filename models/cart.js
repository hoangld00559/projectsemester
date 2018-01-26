var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var CartSchema = mongoose.Schema({
	userId: {
		type: String,
		index:true
	},
	cart: {
		type: Array
	},
	create_date:{
		type: Date,
		default: Date.now
	},
	status: {
		type: Number,
		default: 1
	}
});
var Cart = module.exports = mongoose.model('Cart', CartSchema);

// Add Book
module.exports.addCart = (cart, callback) => {
	Cart.create(cart, callback);
}

// Get Authors
module.exports.getCarts = (callback, limit) => {
	Cart.find(callback).limit(limit);
}

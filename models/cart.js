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
	contact: {
		type: Object
	},
	create_date:{
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		default: "Đang chờ xử lý"
	}
});
var Cart = module.exports = mongoose.model('Cart', CartSchema);

// Add cart
module.exports.addCart = (cart, callback) => {
	Cart.create(cart, callback);
}

// Get carts
module.exports.getCarts = (callback, limit) => {
	Cart.find(callback).limit(limit);
}

// Delete cart
module.exports.removeCart = (id, callback) => {
	var query = {_id: id};
	Cart.remove(query, callback);
}



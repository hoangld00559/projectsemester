const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require('path');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());


Book = require('./models/book');
User = require('./models/user');
Author = require('./models/author');
Cart = require('./models/cart');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

// Book nodejs
app.get('/', (req, res) => {
	res.send('Please use /api/books or /api/brands');
});

app.get('/api/books', (req, res) => {
	Book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});


app.get('/api/books/:_id', (req, res) => {
	Book.getBookById(req.params._id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});


app.post('/api/books', (req, res) => {
	var book = req.body;
	Book.addBook(book, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	Book.removeBook(id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});



// Author

app.get('/api/brands', (req, res) => {
	Author.getAuthors((err, authors) => {
		if(err){
			throw err;
		}
		res.json(authors);
	});
});

app.get('/api/brands/:_id', (req, res) => {
	Author.getAuthorById(req.params._id, (err, author) => {
		if(err){
			throw err;
		}
		res.json(author);
	});
});

app.post('/api/brands', (req, res) => {
	var author = req.body;
	Author.addAuthor(author, (err, author) => {
		if(err){
			throw err;
		}
		res.json(author);
	});
});

app.put('/api/brands/:_id', (req, res) => {
	var id = req.params._id;
	var author = req.body;
	Author.updateAuthor(id, author, {}, (err, author) => {
		if(err){
			throw err;
		}
		res.json(author);
	});
});

app.delete('/api/brands/:_id', (req, res) => {
	var id = req.params._id;
	Author.removeAuthor(id, (err, author) => {
		if(err){
			throw err;
		}
		res.json(author);
	});
});

// Cart

app.post('/api/carts', (req, res) => {
	var cart = req.body;
	Cart.addCart(cart, (err, cart) => {
		if(err){
			throw err;
		}
		res.json(cart);
		console.log(cart);
	});
});


    // Users nodejs
// Register
app.get('/api/registers', function(req, res){
	res.send('Please register');
});

// ReliserializeUser
app.get('/api/register/:_userId', function(req,res){
	var userid = req.params._userId;
	User.getUserById(userid, function(err, user){
		if(err) {
			throw err;
		};
		res.json(user);
	})	
})



// Register User
app.post('/api/registers', function(req, res){
	var newUser = new User({
		name: req.body.name,
		email:req.body.email,
		username:req.body.username,
		password: req.body.password
	});
	User.createUser(newUser, function(err, user){
		if(err) throw err;
		console.log(user);
		res.json(user);
	});
});

// Login

app.get('/api/logins', function(req, res){
	res.send('Please login');
});

app.post('/api/logins', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	User.getUserByUsername(username, function(err, user) {
		if (err) {console.log(err);};
		if(!user) {
			console.log("khong phai user");
			res.status(404).send("User not Found!");
		} else{
			User.comparePassword(password, user.password, function(err, isMatch){
				if(err) {console.log(err);};
				if (isMatch) {
				res.status(200).send(user);
				res.end("dang nhap thanh cong");
				} else {
				console.log("khong dung pass");
				res.status(404).send('Password khong dung');
				};
			});
		};
		
	});
});


var port = process.env.PORT || 8500;
app.listen(port, function(){
	console.log('SERVER RUNNING.... PORT ' + port);
});


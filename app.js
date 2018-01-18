const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
// var exphbs = require('express-handlebars');
var path = require('path');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());


Book =require('./models/book');
User =require('./models/user');
Author = require('./models/author');

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

app.get('/api/books/', (req, res) => {
	Book.getBooksbyGenre(query, function(err, data){
		if(err){
			throw err;
		}
		res.json(data);
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

app.delete('/api/authors/:_id', (req, res) => {
	var id = req.params._id;
	Author.removeAuthor(id, (err, author) => {
		if(err){
			throw err;
		}
		res.json(author);
	});
});


    // Users nodejs

// BodyParser Middleware
app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
// app.use(expressValidator({
//   errorFormatter: function(param, msg, value) {
//       var namespace = param.split('.')
//       , root    = namespace.shift()
//       , formParam = root;

//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param : formParam,
//       msg   : msg,
//       value : value
//     };
//   }
// }));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Register
app.get('/api/registers', function(req, res){
	// res.sendFile(path.join(__dirname+'/client/views/register.html'));
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

// Login

app.get('/api/logins', function(req, res){
	// res.sendFile(path.join(__dirname+'/client/views/login.html'));
	res.send('Please login');
});

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

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//    User.getUserByUsername(username, function(err, user){
//    	if(err) throw err;
//    	if(!user){
//    		return done(null, false, {message: 'Unknown User'});
 
//    	}

//    	User.comparePassword(password, user.password, function(err, isMatch){
//    		if(err) throw err;
//    		if(isMatch){
//    			return done(null, user);
//    		} else {
//    			return done(null, false, {message: 'Invalid password'});
//    		}
//    	});
//    });
//   }));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.getUserById(id, function(err, user) {
//     done(err, user);
//   });
// });

// app.post('/api/logins', passport.authenticate('local', {successRedirect:'/api/products', failureRedirect:'/api/logins',failureFlash: false}),
//   function(req, res) {
//     res.redirect('/');
// });


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

app.get('/api/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/api/logins');
});


var port = process.env.PORT || 8500;
app.listen(port, function(){
	console.log('SERVER RUNNING.... PORT ' + port);
});


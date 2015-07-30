
var mongoose = require('mongoose');

// var mongoPath = process.env.PORT || 'mongodb://localhost/shortly'
mongoose.connect('mongodb://localhost/shortly'); 

//filename: path.join(__dirname, '../db/shortly.sqlite')


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  console.log("We are connected! ------------>");// yay!
});


var Schema = mongoose.Schema;

var userSchema = new Schema({
  id:  Number,
  username: String,
  password:   String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var urlsSchema = new Schema({
  id:  Number,
  url: String,
  base_url:   String,
  code:   String,
  title:   String,
  visits:  Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


var User = mongoose.model('User', userSchema);

var payton = new User({ username: 'payton' });
var Warren = new User({ 'username': 'Warren' });

payton.save(function (err, payton) {
  if (err) return console.error(err);

  console.log("Payton is in the house! ------------>", payton.username);// yay!

});

Warren.save(function (err, warren) {
  if (err) return console.error(err);

  console.log("Warren is in the house! ------------>", warren.username);// yay!

});

User.find(function(err, users){


  console.log(users);
})
// payton.speak(); 
// module.exports = db;



















/**********************legacy code ***********************/

// var Bookshelf = require('bookshelf');

// var path = require('path');

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });


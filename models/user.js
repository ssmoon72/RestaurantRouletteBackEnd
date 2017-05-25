'use strict';

// Import Mongoose
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var uniqueValidator = require('mongoose-unique-validator')

// Define schema for Tasks
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'No username provided!'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'No email provided!']

  },
  password: {
    type: String,
    required: [true, 'No password provided!'],
  },
  history: [{
    place_id: String,
    place_name: String
  }],
  score: {
    type: Number
  },
}, { timestamps: true })

UserSchema.plugin(uniqueValidator);

//generated password hash
UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
//check if password is valid
UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password)
};
//before saving a user, takes user input password and hashes it
UserSchema.pre('save', function(done){
  this.password = this.generateHash(this.password);
  done();
});

// Create model from schema & associate variable to export to server
mongoose.model('Users', UserSchema)

module.exports = mongoose.model('Users')

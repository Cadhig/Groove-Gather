const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const pwSchema = require('../utils/pwValidator');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, 'Username must be at least 3 characters long'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'Please enter a valid email address'],
    },
    // I will implement a custom password validator towards the end of testing.
    // For now, we'll keep the password requirements simple for ease during development stages
    password: {
      type: String,
      required: true,
      // pwSchema goes here near end of development stages
    },
    // Basic profile information
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  });

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
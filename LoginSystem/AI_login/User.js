const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10; // Higher = more secure but slower

// Mongoose schema for users collection
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema, 'users');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  // Register: hash password then save to MongoDB
  async register() {
    const existing = await UserModel.findOne({ username: this.username });
    if (existing) {
      throw new Error('Username already exists');
    }

    // Hash the password before saving (SECURITY: never store plain text)
    const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);

    const newUser = new UserModel({
      username: this.username,
      password: hashedPassword,
    });

    await newUser.save();
    return 'User registered successfully';
  }

  // Login: compare entered password with hashed password in DB
  async login() {
    const found = await UserModel.findOne({ username: this.username });
    if (!found) {
      throw new Error('Invalid username or password');
    }

    // bcrypt.compare checks plain password against hashed password
    const isMatch = await bcrypt.compare(this.password, found.password);
    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    return 'Login successful';
  }
}

module.exports = User;
const mongoose = require('mongoose');

// Define the Mongoose schema for users collection
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema, 'users');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  // Register: save new user to MongoDB
  async register() {
    const existing = await UserModel.findOne({ username: this.username });
    if (existing) {
      throw new Error('Username already exists');
    }
    const newUser = new UserModel({
      username: this.username,
      password: this.password,
    });
    await newUser.save();
    return 'User registered successfully';
  }

  // Login: check user credentials in MongoDB
  async login() {
    const found = await UserModel.findOne({
      username: this.username,
      password: this.password,
    });
    if (!found) {
      throw new Error('Invalid username or password');
    }
    return 'Login successful';
  }
}

module.exports = User;
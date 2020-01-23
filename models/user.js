const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  profilePic: String,
  article: [{
    type: Schema.Types.ObjectId, 
    ref: "Article"
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
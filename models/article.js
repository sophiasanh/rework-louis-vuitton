const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const articleSchema = new mongoose.Schema({
  article: String,
  title: String,
  details: String
  }, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);
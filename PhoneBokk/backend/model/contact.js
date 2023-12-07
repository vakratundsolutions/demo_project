const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  fname: String,
  lname: String,
  contact: Number,
  city: String,
  country: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }, // ref
});

const CONTACT = mongoose.model('contact', contactSchema);

module.exports = CONTACT
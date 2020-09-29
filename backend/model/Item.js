const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Item = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  count_number: {
    type: Number
  },
  picture: {
    type: String
  }
},{
    collection: 'item'
});

module.exports = mongoose.model('Item', Item);
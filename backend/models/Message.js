// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const messageSchema = new Schema({
//   username: { type: String, default: 'Anonymous' },
//   text: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Message', messageSchema);

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    username: { type: String, default: 'Anonymous' },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);

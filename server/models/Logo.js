var mongoose = require('mongoose');


var LogoSchema = new mongoose.Schema({
  id: String,
  height: { type: Number, min:100 },
  width: { type: Number, min: 100 },
  text: [
    {
      posX: Number,
      posY: Number,
      textString: String,
      textFontSize: { type: Number, min: 2, max: 144 },
      textColor: String
      // type: mongoose.Schema.Types.ObjectId, // every piece of text has cooridinates, color, font size
      // ref: 'LogoText'
    }
  ],
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 2, max: 100 },
  borderWidth: { type: Number, min: 2, max: 144 },
  images: [String],
  padding: { type: Number, min: 2, max: 144 },
  margin: { type: Number, min: 2, max: 144 },
  lastUpdate: { type: Date, default: Date.now },
  created_by: { // logos can only be created by users
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Logo', LogoSchema);
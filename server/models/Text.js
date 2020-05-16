var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var textSchema = new Schema({
    posX: Number,
    posY: Number,
    textString: String,
    textFontSize: { type: Number, min: 2, max: 144 },
    textColor: String
});

module.exports = mongoode.model('LogoText', textSchema);
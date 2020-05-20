var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdLogos: [
        {
            type: Schema.Types.ObjectId, //every user will have created logos at some point
            ref: 'Logo'
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);
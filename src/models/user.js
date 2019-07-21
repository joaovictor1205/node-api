var mongoose = require('../database/configDB');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

});

UserSchema.pre('save', async function (next) {
    var hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
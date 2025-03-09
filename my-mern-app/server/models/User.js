const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: 8 
    },
    password: { 
        type: String, 
        required: true 
    },
}, 
{ timestamps: true });

const User = mongoose.model('Usertables', UserSchema);

module.exports = User;

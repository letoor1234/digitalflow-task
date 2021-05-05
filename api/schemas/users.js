const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
});

userSchema.methods.hashPassword = (password) => {
    return bcrypt.hash(password, 12);
};

userSchema.methods.comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
};

var User = mongoose.model("User", userSchema);

module.exports = User;

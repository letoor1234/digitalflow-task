const jwt = require("jsonwebtoken");

const User = require("../schemas/users");
const registerController = async (req, callback) => {
    try {
        const { username, name, email, password, address, mobile } = req.body;
        User.findOne({ email })
            .then((data) => {
                if (data) {
                    return callback({
                        text: "Email already exists in the database",
                        status: false,
                        data: {},
                    });
                } else {
                    User.findOne({ username })
                        .then(async (data) => {
                            if (data) {
                                return callback({
                                    text:
                                        "Username already exists in the database",
                                    status: false,
                                    data: {},
                                });
                            } else {
                                //START REGISTER!!!

                                const newUser = new User();
                                newUser.username = username;
                                newUser.name = name;
                                newUser.email = email;
                                newUser.password = await newUser.hashPassword(
                                    password
                                );
                                newUser.address = address;
                                newUser.mobile = mobile;

                                newUser
                                    .save()
                                    .then((data) => {
                                        const payload = {
                                            check: true,
                                            user_id: data._id,
                                        };
                                        const token = jwt.sign(
                                            payload,
                                            process.env.KEY,
                                            {
                                                expiresIn: 1440,
                                            }
                                        );
                                        return callback({
                                            text: "",
                                            status: true,
                                            data: token,
                                        });
                                    })
                                    .catch((err) => {
                                        return callback({
                                            text: "Error saving on database",
                                            status: false,
                                            data: err,
                                        });
                                    });
                            }
                        })
                        .catch((err) => {
                            return callback({
                                text: "Error finding username in database",
                                status: false,
                                data: err,
                            });
                        });
                }
            })
            .catch((err) => {
                return callback({
                    text: "Error finding email in database",
                    status: false,
                    data: err,
                });
            });
    } catch (err) {
        return callback({ status: false, data: err });
    }
};

const loginController = async (req, callback) => {
    const { username, password } = req.body;
    User.findOne({ $or: [{ username }, { email: username }] })
        .then(async (data) => {
            if (!data) {
                return callback({
                    text: "No user or email found",
                    status: false,
                    data: {},
                });
            } else {
                const passwordVerified = await data.comparePassword(
                    password,
                    data.password
                );
                if (!passwordVerified) {
                    return callback({
                        text: "Password don't match",
                        status: false,
                        data: {},
                    });
                } else {
                    const payload = {
                        check: true,
                        user_id: data._id,
                    };
                    const token = jwt.sign(payload, process.env.KEY, {
                        expiresIn: 1440,
                    });
                    return callback({
                        text: "",
                        status: true,
                        data: token,
                    });
                }
            }
        })
        .catch((err) => {
            return callback({
                text: "Error finding user in database",
                status: false,
                data: err,
            });
        });
};

const getUserdataController = async (req, callback) => {
    const { user_id } = req.decoded;
    User.findById(user_id, { _id: 0 })
        .then((data) => {
            if (!data) {
                return callback({
                    text: "No user finded",
                    status: false,
                    data: {},
                });
            } else {
                return callback({ text: "", status: true, data });
            }
        })
        .catch((err) => {
            return callback({
                text: "Error finding user in database",
                status: false,
                data: err,
            });
        });
};
module.exports = {
    registerController,
    loginController,
    getUserdataController,
};

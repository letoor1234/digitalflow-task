const jwt = require("jsonwebtoken");

const User = require("../schemas/users");
const registerController = async (req, callback) => {
    try {
        const { username, name, email, password, address, mobile } = req.body;
        User.findOne({ email })
            .then((data) => {
                if (data) {
                    return {
                        text: "",
                        status: true,
                        data: { alert: "Email already exists in the database" },
                    };
                } else {
                    User.findOne({ username })
                        .then((data) => {
                            if (data) {
                                return {
                                    text: "",
                                    status: true,
                                    data: {
                                        alert:
                                            "Username already exists in the database",
                                    },
                                };
                            } else {
                                //START REGISTER!!!

                                const newUser = new User(req.body);
                                newUser
                                    .save()
                                    .then((data) => {
                                        const payload = {
                                            check: true,
                                        };
                                        const token = jwt.sign(
                                            payload,
                                            process.env.KEY,
                                            {
                                                expiresIn: 1440,
                                            }
                                        );
                                        return {
                                            text: "",
                                            status: true,
                                            data: {
                                                ...data,
                                                token,
                                            },
                                        };
                                    })
                                    .catch((err) => {
                                        return {
                                            text: "Error saving on database",
                                            status: false,
                                            data: err,
                                        };
                                    });
                            }
                        })
                        .catch((err) => {
                            return {
                                text: "Error finding username in database",
                                status: false,
                                data: err,
                            };
                        });
                }
            })
            .catch((err) => {
                return {
                    text: "Error finding email in database",
                    status: false,
                    data: err,
                };
            });
    } catch (err) {
        return { status: false, data: err };
    }
};

module.exports = {
    registerController,
};

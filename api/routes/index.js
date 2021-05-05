const express = require("express");
const router = express.Router();
const {
    registerController,
    loginController,
    getUserdataController,
} = require("../controller");
const jwt = require("jsonwebtoken");

const authentication = (req, callback) => {
    const token = req.headers["access-token"];
    if (token) {
        jwt.verify(token, process.env.KEY, (err, decoded) => {
            if (err) {
                return callback({ text: "Invalid Token", status: false });
            } else {
                req.decoded = decoded;
                return callback({ text: "", status: true, data: req });
            }
        });
    } else {
        return callback({ text: "No Token Provided", status: false });
    }
};

router.post("/register", (req, res) => {
    return registerController(req, (result) => {
        if (!result.status) {
            res.json({ alert: result.text });
        } else {
            res.json(result.data);
        }
    });
});

router.post("/login", (req, res) => {
    return loginController(req, (result) => {
        if (!result.status) {
            res.json({ alert: result.text });
        } else {
            res.json(result.data);
        }
    });
});

router.get("/get-user", (req, res) => {
    return authentication(req, (result) => {
        if (!result.status) {
            res.json({ alert: result.text });
        } else {
            return getUserdataController(result.data, (result) => {
                if (!result.status) {
                    res.json({ alert: result.text });
                } else {
                    res.json(result.data);
                }
            });
        }
    });
});
module.exports = router;

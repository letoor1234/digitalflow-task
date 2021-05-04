const express = require("express");
const router = express.Router();
const { registerController } = require("../controller");

router.post("/register", (req, res) => {
    return registerController(req, (result) => {
        res.json("holiwi"); //result.data);
    });
});

module.exports = router;

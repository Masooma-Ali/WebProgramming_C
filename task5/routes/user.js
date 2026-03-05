const express = require("express");
const router = express.Router();

// Demo route
router.get("/get", (req, res) => {
    res.send("get Route Working!");
});

router.post("/post", (req, res) => {
    res.send("post Route Working!");
});

router.put("/put", (req, res) => {
    res.send("put Route Working!");
});

router.delete("/delete", (req, res) => {
    res.send("delete Route Working!");
});

module.exports = router;
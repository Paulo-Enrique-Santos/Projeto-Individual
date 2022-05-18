var express = require("express");
var router = express.Router();

var validacoesController = require("../controllers/validacoesController");

router.post("/attLikes", function (req, res) {
    validacoesController.attLikes(req, res);
});

module.exports = router;
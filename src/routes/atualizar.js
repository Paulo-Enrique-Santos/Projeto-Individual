var express = require("express");
var router = express.Router();

var atualizarController = require("../controllers/atualizarController");

router.get("/listarGenero", function (req, res) {
    atualizarController.listarGenero(req, res);
});

router.post("/addLike", function (req, res) {
    atualizarController.addLike(req, res);
});

router.post("/removeLike", function (req, res) {
    atualizarController.removeLike(req, res);
});

router.get("/listarMusic", function (req, res) {
    atualizarController.listarMusic(req, res);
});

router.post("/listarFoto", function (req, res) {
    atualizarController.listarFoto(req, res);
});

module.exports = router;
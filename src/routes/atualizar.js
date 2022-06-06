var express = require("express");
var router = express.Router();

var atualizarController = require("../controllers/atualizarController");

router.get("/listarGenero", function (req, res) {
    atualizarController.listarGenero(req, res);
});

router.get("/listarArtista", function (req, res) {
    atualizarController.listarArtista(req, res);
});

router.get("/attDadosArtista/:idArtista/", function (req, res) {
    atualizarController.attDadosArtista(req, res);
});

router.get("/atualizarPlaylist/:idUsuario/", function (req, res) {
    atualizarController.atualizarPlaylist(req, res);
});

router.post("/addLike", function (req, res) {
    atualizarController.addLike(req, res);
});

router.post("/listarPlaylist", function (req, res) {
    atualizarController.listarPlaylist(req, res);
});

router.post("/atualizarMusicas", function (req, res) {
    atualizarController.atualizarMusicas(req, res);
});

router.post("/atualizarMusicasArtista", function (req, res) {
    atualizarController.atualizarMusicasArtista(req, res);
});

router.post("/deletarMusicaPlaylist", function (req, res) {
    atualizarController.deletarMusicaPlaylist(req, res);
});

router.post("/addPlaylist", function (req, res) {
    atualizarController.addPlaylist(req, res);
});

router.post("/criarPlaylist", function (req, res) {
    atualizarController.criarPlaylist(req, res);
});

router.post("/deletarPlaylist", function (req, res) {
    atualizarController.deletarPlaylist(req, res);
});

router.post("/removeLike", function (req, res) {
    atualizarController.removeLike(req, res);
});

router.get("/listarMusic", function (req, res) {
    atualizarController.listarMusic(req, res);
});

router.get("/topMusica", function (req, res) {
    atualizarController.topMusica(req, res);
});

router.get("/topArtista", function (req, res) {
    atualizarController.topArtista(req, res);
});

router.post("/listarFoto", function (req, res) {
    atualizarController.listarFoto(req, res);
});

router.get("/listarFavoritas/:idUser/", function (req, res) {
    atualizarController.listarFavoritas(req, res);
});

router.get("/pesquisarMusica", function (req, res) {
    atualizarController.pesquisarMusica(req, res);
});

router.get("/pesquisarArtista", function (req, res) {
    atualizarController.pesquisarArtista(req, res);
});

router.get("/pesquisarGenero", function (req, res) {
    atualizarController.pesquisarGenero(req, res);
});

module.exports = router;
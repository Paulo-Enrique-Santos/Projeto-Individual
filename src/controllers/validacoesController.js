var validacoesModel = require("../models/validacoesModel");

function attLikes(req, res) {

    var idMusic = req.body.idMusicServer;
    var idUser = req.body.idUserServer;

    validacoesModel.attLikes(idMusic, idUser)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao dar Like Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}


module.exports = {
    attLikes
}
var atualizarModel = require("../models/atualizarModel");

function listarGenero(req, res) {
    atualizarModel.listarGenero().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarArtista(req, res) {
    atualizarModel.listarArtista().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function addLike(req, res) {

    var idMusic = req.body.idMusicServer;
    var idUser = req.body.idUserServer;

    atualizarModel.addLike(idMusic, idUser)
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

function listarPlaylist(req, res) {

    var idUser = req.body.idUserServer;

    atualizarModel.listarPlaylist(idUser)
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

function atualizarMusicas(req, res) {

    var idPlaylist = req.body.idPlaylistServer;

    atualizarModel.atualizarMusicas(idPlaylist)
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

function atualizarMusicasArtista(req, res) {

    var idPlaylist = req.body.idPlaylistServer;

    atualizarModel.atualizarMusicasArtista(idPlaylist)
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

function atualizarMusicasGenero(req, res) {

    var idPlaylist = req.body.idPlaylistServer;

    atualizarModel.atualizarMusicasGenero(idPlaylist)
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

function atualizarMusicasMusica(req, res) {

    var idPlaylist = req.body.idPlaylistServer;

    atualizarModel.atualizarMusicasMusica(idPlaylist)
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

function addPlaylist(req, res) {

    var idPlaylist = req.body.idPlaylistServer;
    var idMusica = req.body.idMusicaServer;

    atualizarModel.addPlaylist(idPlaylist,idMusica)
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

function criarPlaylist(req, res) {

    var nome = req.body.nomeServer;
    var idUser = req.body.idUserServer;

    atualizarModel.criarPlaylist(nome, idUser)
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

function deletarPlaylist(req, res) {

    var idPlaylist = req.body.idPlaylistServer;

    atualizarModel.deletarPlaylist(idPlaylist)
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

function deletarMusicaPlaylist(req, res) {

    var idMusica = req.body.idMusicaServer
    var idPlaylist = req.body.idPlaylistServer;

    atualizarModel.deletarMusicaPlaylist(idMusica,idPlaylist)
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

function removeLike(req, res) {

    var idMusic = req.body.idMusicServer;
    var idUser = req.body.idUserServer;

    atualizarModel.removeLike(idMusic, idUser)
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

function listarMusic(req, res) {
    atualizarModel.listarMusic().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarFavoritas(req, res) {
    var idUser = req.params.idUser;

    atualizarModel.listarFavoritas(idUser).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function attDadosArtista(req, res) {
    var idArtista = req.params.idArtista;

    atualizarModel.attDadosArtista(idArtista).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizarPlaylist(req, res) {
    var idUsuario = req.params.idUsuario;

    atualizarModel.atualizarPlaylist(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as playlists: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarFoto(req, res) {
    var idVar = req.body.idServer;

    atualizarModel.listarFoto(idVar).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as fotos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function topMusica(req, res) {

    atualizarModel.topMusica().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o top 10: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function topArtista(req, res) {

    atualizarModel.topArtista().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o top 10: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pesquisarMusica(req, res) {

    atualizarModel.pesquisarMusica().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as musicas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pesquisarArtista(req, res) {

    atualizarModel.pesquisarArtista().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os artistas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pesquisarGenero(req, res) {

    atualizarModel.pesquisarGenero().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os generos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listarGenero,
    listarFoto,
    listarMusic,
    addLike,
    removeLike,
    listarFavoritas,
    listarArtista,
    attDadosArtista,
    atualizarPlaylist,
    criarPlaylist,
    deletarPlaylist,
    listarPlaylist,
    addPlaylist,
    atualizarMusicas,
    deletarMusicaPlaylist,
    topMusica,
    topArtista,
    atualizarMusicasArtista,
    pesquisarMusica,
    pesquisarArtista,
    pesquisarGenero,
    atualizarMusicasGenero,
    atualizarMusicasMusica
}
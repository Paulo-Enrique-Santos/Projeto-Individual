var database = require("../database/config");

function listarGenero() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select distinct 
        genero 
    from Artista;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarArtista() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select distinct 
        idArtista,
        nome as artista, 
        caminhoFoto, 
        genero 
    from artista;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMusic() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select 
        idMusica,
        musica.nome as musica,
        artista.nome as artista,
        musica.caminhoFoto,
        musica.caminhoAudio
    from musica 
        join feat on idMusica = fkMusica 
	        join Artista on fkArtista = idArtista;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function attDadosArtista(idArtista) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select 
	    count(idMusica) as musics, 
        sum(likes) as likes 
    from musica 
	    join feat on idMusica = feat.fkMusica 
		    join artista on feat.fkArtista = idArtista 
			    where idArtista = ${idArtista};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarPlaylist(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select 
	    playlist.idPlaylist,
        playlist.nomePlaylist
    from Usuario
	    join playlist on idUsuario = fkUsuario 
		    where fkUsuario = ${idUsuario};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarFavoritas(idUser) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select 
        idMusica,musica.nome as musica, 
        artista.nome as artista, 
        musica.caminhoFoto, 
        caminhoAudio 
    from usuario 
    join likes on usuario.idUsuario = likes.fkUsuario 
        join musica on likes.fkMusica = musica.idMusica 
	        join feat on idMusica = feat.fkMusica 
		        join artista on feat.fkArtista = idArtista 
                    where idUsuario = ${idUser};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function addLike(idMusic,idUser) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    insert into likes values (${idUser}, ${idMusic});
    `;

    var instrucao2 = `
    update musica set likes = likes+1 where idMusica = ${idMusic};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    console.log("Executando a instrução SQL: \n" + instrucao2);
    database.executar(instrucao2);
    return database.executar(instrucao);
}

function listarPlaylist(idUser) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select 
	    idPlaylist,
        nomePlaylist
    from usuario 
        join playlist on idUsuario = fkUsuario
            where idUsuario = ${idUser};
    `;
    return database.executar(instrucao);
}

function atualizarMusicas(idPlaylist) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select 
        artista.nome as artista,
        musica.nome as musica,
        idMusica,
        musica.caminhoFoto,
        musica.caminhoAudio,
        artista.idArtista
    from Playlist
        join musicaplaylist on idPlaylist = fkplaylist
            join musica on musicaplaylist.fkmusica = idMusica
                join feat on idMusica = feat.fkMusica
                    join artista on fkArtista = idArtista
                        where idPlaylist = ${idPlaylist};
    `;
    return database.executar(instrucao);
}

function addPlaylist(idPlaylist,idMusica) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n " + idMusica + idPlaylist);
    var instrucao = `
    insert into MusicaPlaylist(fkMusica,fkPlaylist) values 
    (${idMusica},${idPlaylist});
    `;
    return database.executar(instrucao);
}

function criarPlaylist(nome,idUser) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    insert into Playlist (nomePlaylist,fkUsuario) values
    ('${nome}',${idUser});
    `;
    return database.executar(instrucao);
}

function deletarPlaylist(idPlaylist) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    delete from playlist where idPlaylist = ${idPlaylist};
    `;

    var instrucao2 = `
    delete from musicaplaylist where fkPlaylist =${idPlaylist};
    ` 
    database.executar(instrucao2);
    return database.executar(instrucao);
}

function removeLike(idMusic,idUser) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    DELETE FROM likes WHERE fkUsuario = ${idUser} AND fkMusica = ${idMusic};
    `;

    var instrucao2 = `
    update musica set likes = likes-1 where idMusica = ${idMusic};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    console.log("Executando a instrução SQL: \n" + instrucao2);
    database.executar(instrucao2);
    return database.executar(instrucao);
}

function listarFoto(id) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select distinct 
	nome, 
    caminhoFoto 
from Artista
	where genero = '${id}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
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
    atualizarMusicas
}

var database = require("../database/config");

function listarGenero() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarGenero()");
    var instrucao = `
    select distinct 
        genero 
    from Artista;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarArtista() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarArtista()");
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
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarMusic()");
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
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function attDadosArtista()");
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
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarPlaylist()");
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
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFavoritas()");
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
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function addLike()");
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
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPlaylist()");
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
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarMusicas()");
    var instrucao = `
    select 
        artista.nome as artista,
        musica.nome as musica,
        idMusica,
        musica.caminhoFoto,
        musica.caminhoAudio,
        artista.idArtista,
        PlayList.nomePlaylist
    from Playlist
        join musicaplaylist on idPlaylist = fkplaylist
            join musica on musicaplaylist.fkmusica = idMusica
                join feat on idMusica = feat.fkMusica
                    join artista on fkArtista = idArtista
                        where idPlaylist = ${idPlaylist};
    `;
    return database.executar(instrucao);
}

function atualizarMusicasArtista(idArtista) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarMusicasArtista()");
    var instrucao = `
    select 
        artista.nome as artista,
        musica.nome as musica,
        idMusica,
        musica.caminhoFoto,
        musica.caminhoAudio
    from musica
    join feat on idMusica = fkMusica
        join artista on fkArtista = idArtista
            where fkArtista = ${idArtista};   
    `;
    return database.executar(instrucao);
}

function atualizarMusicasGenero(nomeGenero) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarMusicasGenero()");
    var instrucao = `
    select 
        artista.nome as artista,
        musica.nome as musica,
        idMusica,
        musica.caminhoFoto,
        musica.caminhoAudio
    from musica
    join feat on idMusica = fkMusica
        join artista on fkArtista = idArtista
            where musica.genero = '${nomeGenero}';   
    `;
    return database.executar(instrucao);
}

function atualizarMusicasMusica(idMusica) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarMusicasMusica()");
    var instrucao = `
    select 
        artista.nome as artista,
        musica.nome as musica,
        idMusica,
        musica.caminhoFoto,
        musica.caminhoAudio
    from musica
    join feat on idMusica = fkMusica
        join artista on fkArtista = idArtista
            where musica.idMusica = ${idMusica};   
    `;
    return database.executar(instrucao);
}

function addPlaylist(idPlaylist,idMusica) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function addPlaylist()");
    var instrucao = `
    insert into MusicaPlaylist(fkMusica,fkPlaylist) values 
    (${idMusica},${idPlaylist});
    `;
    return database.executar(instrucao);
}

function criarPlaylist(nome,idUser) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function criarPlaylist()");
    var instrucao = `
    insert into Playlist (nomePlaylist,fkUsuario) values
    ('${nome}',${idUser});
    `;
    return database.executar(instrucao);
}

function deletarPlaylist(idPlaylist) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarPlaylist()");
    var instrucao = `
    delete from playlist where idPlaylist = ${idPlaylist};
    `;

    var instrucao2 = `
    delete from musicaplaylist where fkPlaylist =${idPlaylist};
    ` 
    database.executar(instrucao2);
    return database.executar(instrucao);
}

function deletarMusicaPlaylist(idMusica,idPlaylist) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarMusicaPlaylist()");
    var instrucao = `
    delete from MusicaPlaylist where fkMusica = ${idMusica} and fkPlaylist = ${idPlaylist};
    `;
    return database.executar(instrucao);
}

function removeLike(idMusic,idUser) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removeLike()");
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

function listarFoto(nomeGenero) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFoto()");
    var instrucao = `
    select distinct 
	nome, 
    caminhoFoto 
from Artista
	where genero = '${nomeGenero}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function topMusica() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function topMusica()");
    var instrucao = `
    select 
        artista.nome as artista,
        musica.nome as musica,
        musica.caminhoFoto,
        likes
    from artista
        join feat on idArtista = feat.fkArtista
            join musica on feat.fkmusica = idmusica
                        order by likes desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function topArtista() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function topArtista()");
    var instrucao = `
    select 
        sum(likes) as likes,
        artista.nome as artista,
        artista.genero,
        artista.caminhoFoto
    from artista
        join feat on idArtista = feat.fkArtista
            join musica on feat.fkmusica = idmusica
                group by artista.nome 
                    order by likes desc limit 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pesquisarMusica() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarMusica()");
    var instrucao = `
    select 
        * 
    from musica;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pesquisarArtista() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarArtista()");
    var instrucao = `
    select 
        * 
    from artista;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pesquisarGenero() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarGenero()");
    var instrucao = `
    select 
        distinct(genero)
    from musica;
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

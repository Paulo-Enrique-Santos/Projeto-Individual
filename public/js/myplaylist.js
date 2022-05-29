let arrayMusic = [];

//FUNÇÃO PARA PEGAR OS ARTISTAS DO BANCO DE DADOS
function atualizarPlaylist() {
    var idUser = sessionStorage.ID_USUARIO;
    fetch(`/atualizar/atualizarPlaylist/${idUser}`).then(function (resposta) {
        if (resposta.ok) {
            var feed = document.getElementById("playlist");
            feed.innerHTML = "";
            if (resposta.status == 204) {
                feed.innerHTML = `
                <h1 class="resultados">Nenhuma PlayList encontrada.</h1>
                `;
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];
                    feed.innerHTML += `
                    <div class="card">
                    <div class="playerPlaylist">
                        <div class="foto">
                            <img src="./assets/picture/play pause.gif" >
                        </div>
                        <div class="botoes">
                            <img class="trocar" src="./assets/picture/inicio.png">
                            <img class="play" src="./assets/picture/play.png">
                            <img class="pause" src="./assets/picture/pause.png">
                            <img class="trocar" src="./assets/picture/fim.png">
                        </div>
                    </div>
                    <div class="select">
                        <div class="titles-play">
                            <h2 class="title-play">${publicacao.nomePlaylist}</h2>
                            <img onclick="deletarPlaylist(${publicacao.idPlaylist})" src="./assets/picture/delete.png" >
                        </div>

                        <div class="musics" id="musicasPlaylist${publicacao.idPlaylist}">

                        </div>
                    </div>

                </div> 

                `

                atualizarMusicas(publicacao.idPlaylist);
                }
            });
            setTimeout(() => {
               // carregarDuracao();
             }, "8000")

        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

//CRIAR OS CARDS DE PLAYLIST
function criarPlaylist(){

    var idUser = sessionStorage.ID_USUARIO;
    var nomePlaylist = inputNomePlaylist.value;

    if(nomePlaylist == ""){
        alert('Nome da PlayList não pode ser nulo!');
        return;
    }

    fetch("/atualizar/criarPlaylist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomePlaylist,
            idUserServer: idUser
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            document.location.reload(true);
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

//DELETAR AS PLAYLIST
function deletarPlaylist(idPlaylist){

    fetch("/atualizar/deletarPlaylist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            idPlaylistServer: idPlaylist
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            document.location.reload(true);
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

//ADICIONAR AS MÚSICAS DA PLAYLIST
function atualizarMusicas(idPlaylist){
    fetch("/atualizar/atualizarMusicas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            idPlaylistServer: idPlaylist
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var feed = document.getElementById(`musicasPlaylist${idPlaylist}`);
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];
                    var artist = document.getElementById(`artista${publicacao.idMusica}${idPlaylist}`);

                    if(artist != null){
                    artist.innerHTML += ', ' + publicacao.artista;
                    } else {
                        feed.innerHTML += `
                <div class="music" id="${publicacao.idMusica}${idPlaylist}">
                            <div class="sobre" id="sobre${publicacao.idMusica}${idPlaylist}"></div>
                            <div class="wave" id="waves${publicacao.idMusica}${idPlaylist}"></div>
                            <div class="foto" id="foto${publicacao.idMusica}${idPlaylist}">

                            </div>

                            <div class="titles-musics">
                                <h2>${publicacao.musica}</h2>
                                <h3 id="artista${publicacao.idMusica}${idPlaylist}">${publicacao.artista}</h3>  
                            </div>
                            <img src="./assets/picture/delete-list.png">
                        </div>

                        `
                        var foto = document.getElementById(`foto${publicacao.idMusica}${idPlaylist}`);

                        foto.style.backgroundImage = `url("/assets/picture/${publicacao.caminhoFoto}")`


                        var wavesurfer = WaveSurfer.create({
                            container: '#waves' + publicacao.idMusica + idPlaylist
                        });
                        
                        wavesurfer.load(`./assets/audio/${publicacao.caminhoAudio}`);
                        var adicionar = arrayMusic.push(wavesurfer);
                    }
                    
                }

            });
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

}

document.addEventListener('click', function (event){
    var clickBruto = event.target.id;
    var click = clickBruto.replace('sobre', '');

    for(var i = 0; i < arrayMusic.length ; i++){
        var idWaveBruto = arrayMusic[i].container.id;
        var idWave = idWaveBruto.replace('waves','');

        if(click == idWave){
            for(var b = 0; b < arrayMusic.length; b ++){
                var idWaveBruto = arrayMusic[b].container.id;
                var idWave = idWaveBruto.replace('waves','');        
                if(arrayMusic[b].isPlaying() == true){
                    if(idWave != click){
                        arrayMusic[b].stop();
                    }
                }
            }
            arrayMusic[i].playPause();
        }
    }

});
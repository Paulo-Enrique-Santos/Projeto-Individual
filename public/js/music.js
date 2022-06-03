//ARRAY QUE SALVA AS MÚSICAS
var arrayMusic = [];

var idMusica = 0;

//EVENTO QUE CHAMA FUNÇÃO CLICK (QUE FAZ AS MUSICAS TOCAREM)
document.addEventListener('click', click);

//EVENTO QUE CHAMA A FUNÇÃO PARA DAR OU TIRAR LIKE DE UMA MÚSICA
document.addEventListener('click', function (event) {
    var classClick = event.target.className;
    var idClick = event.target.id;
    var idConteudo = idClick.replace(/^./, "");

    if (classClick == 'like' && validarSessao() == true) {
        document.querySelector(`#${idClick}`).classList.add("likeRed");
        document.querySelector(`#${idClick}`).classList.remove("like");
        addLike(idConteudo);
    } else if (classClick == 'like' && validarSessao() == false) {
        AbrirLogin();
    } else if (classClick == 'likeRed' && validarSessao() == true) {
        document.querySelector(`#${idClick}`).classList.add("like");
        document.querySelector(`#${idClick}`).classList.remove("likeRed");
        removeLike(idConteudo);
    }
});

//VALIDANDO SE A MÚSICA ESTÁ TOCANDO E FAZ ALGUMAS COISAS NAS FUNÇÕES
setInterval(() => {
    for (var i = 0; i < arrayMusic.length; i++) {
        var idBruto = arrayMusic[i].container.id;
        var idMusica = idBruto.replace('waves', '');
        var tamanhoTotal = document.getElementById(`duracao${idMusica}`)
        var tempo = document.getElementById(`audio${idMusica}`);
        var progressTag = document.querySelector('progress');
        var artista = document.getElementById(`artista${idMusica}`);
        var musica = document.getElementById(`musica${idMusica}`);
        var tocando = document.getElementById(`nmrMusica${idMusica}`);
        var equalizador = document.getElementById(`equalizador${idMusica}`);
        var player = document.querySelector(`.player_bottom`);

        if(arrayMusic[i].getDuration() == arrayMusic[i].getCurrentTime() && 
           arrayMusic[i].getCurrentTime() != 0){
            arrayMusic[i].stop();
            if(arrayMusic[i+1] == undefined){
                arrayMusic[0].play();
            } else {
                arrayMusic[i+1].play();
            }
        }
        
        if(tamanhoTotal.innerHTML == "NaN:NaN"){
            carregarDuracao();
        }
        
        if (arrayMusic[i].isPlaying()) {
            progressTag.max = Math.floor(tempo.duration);
            progressTag.value = Math.floor(arrayMusic[i].getCurrentTime());
            musica.style.color = "var(--contraste-color)";
            duracao_atual.innerHTML = converterTempo(arrayMusic[i].getCurrentTime());
            duracao_final.innerHTML = tamanhoTotal.innerHTML;
            tocando.style.display = "none";
            equalizador.style.display = "flex";
            musica_bottom.innerHTML = musica.innerHTML;
            artista_bottom.innerHTML = artista.innerHTML;
            player.style.display = 'flex';
        } else {
            tocando.style.display = "flex";
            equalizador.style.display = "none";
            musica.style.color = "var(--textos2-color)";
        }
    }
}, 1000);

//FUNCTION CLICK QUE FAZ AS MUSICAS TOCAREM
function click(event) {
    var clickBruto = event.target.id;
    var click = clickBruto.replace('sobre', '');

    for (var i = 0; i < arrayMusic.length; i++) {
        var idWaveBruto = arrayMusic[i].container.id;
        var idWave = idWaveBruto.replace('waves', '');

        if (click == idWave) {
            for (var b = 0; b < arrayMusic.length; b++) {
                var idWaveBruto = arrayMusic[b].container.id;
                var idWave = idWaveBruto.replace('waves', '');
                if (arrayMusic[b].isPlaying() == true) {
                    if (idWave != click) {
                        arrayMusic[b].stop();
                    }
                }
            }
            arrayMusic[i].stop();
            arrayMusic[i].play();
        }
    }
}

//FUNÇÃO PARA PEGAR AS MUSICAS DO BANCO DE DADOS
function atualizarMusic() {
    fetch("/atualizar/listarMusic").then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var divPai = document.getElementById("music");
                var audio = document.getElementById('audio');
                for (let i = 0; i < resposta.length; i++) {
                    var resp = resposta[i];
                    var verMusica = document.getElementById("l" + resp.idMusica);
                    var artist = document.getElementById("artista" + resp.idMusica);

                    if (verMusica != null) {
                        artist.innerHTML += ', ' + resp.artista;
                    } else {

                        var audioAtual = document.createElement('audio');
                        audioAtual.id = `audio${resp.idMusica}`;
                        audioAtual.src = `./assets/audio/${resp.caminhoAudio}`;
                        audio.appendChild(audioAtual);

                        var divPlayer = document.createElement("div");
                        divPlayer.className = `player`;
                        divPai.appendChild(divPlayer);

                        var sobre = document.createElement("div");
                        sobre.className = 'sobre';
                        sobre.id = resp.idMusica;
                        divPlayer.appendChild(sobre);

                        var nmrMusica = document.createElement("div");
                        nmrMusica.className = `nmrMusica`
                        divPlayer.appendChild(nmrMusica);

                        var span = document.createElement("span");
                        span.id = `nmrMusica${resp.idMusica}`;
                        span.innerHTML = `${arrayMusic.length + 1}`;
                        nmrMusica.appendChild(span);

                        var equalizador = document.createElement('div');
                        equalizador.className = "equalizador";
                        nmrMusica.appendChild(equalizador);
                        equalizador.id = `equalizador${resp.idMusica}`

                        var filhoUm = document.createElement('div');
                        equalizador.appendChild(filhoUm);

                        var filhoDois = document.createElement('div');
                        equalizador.appendChild(filhoDois);

                        var filhoTres = document.createElement('div');
                        equalizador.appendChild(filhoTres);

                        var filhoQuatro = document.createElement('div');
                        equalizador.appendChild(filhoQuatro);

                        var filhoCinco = document.createElement('div');
                        equalizador.appendChild(filhoCinco);

                        var filhoSeis = document.createElement('div');
                        equalizador.appendChild(filhoSeis);

                        var divFoto = document.createElement("div");
                        divFoto.className = "foto";
                        divFoto.style.backgroundImage = `url("/assets/picture/${resp.caminhoFoto}")`;
                        divPlayer.appendChild(divFoto);

                        var divTitles = document.createElement('div');
                        divTitles.className = 'titles';
                        divPlayer.appendChild(divTitles);

                        var music = document.createElement('h2');
                        music.className = 'title-music';
                        music.id = 'musica' + resp.idMusica
                        music.innerHTML = resp.musica;
                        divTitles.appendChild(music);

                        var artista = document.createElement('h3');
                        artista.className = 'title-artist';
                        artista.id = 'artista' + resp.idMusica;
                        artista.innerHTML += resp.artista;
                        divTitles.appendChild(artista);

                        var divWaves = document.createElement('div');
                        divWaves.className = 'waveform'
                        divWaves.id = 'waves' + resp.idMusica;
                        divPlayer.appendChild(divWaves);

                        var divFinal = document.createElement('div');
                        divFinal.className = 'final';
                        divFinal.id = `div_final_${i}`
                        divPlayer.appendChild(divFinal);

                        var timeMusic = document.createElement('span');
                        timeMusic.id = 'duracao' + resp.idMusica;
                        divFinal.appendChild(timeMusic);

                        var like = document.createElement('div');
                        like.className = 'like';
                        like.id = 'l' + resp.idMusica;
                        divFinal.appendChild(like);

                        var addPlaylist = document.createElement('h1');
                        addPlaylist.innerHTML = '+';
                        divFinal.appendChild(addPlaylist);
                        addPlaylist.addEventListener('click', function () {
                            addMusicPlaylist(resp.idMusica);
                        });

                        var wavesurfer = WaveSurfer.create({
                            container: '#waves' + resp.idMusica,
                            waveColor: '#a8a8a8',
                            progressColor: '#01a0c8',
                            height: 50,
                            responsive: true,
                            barWidth: 3,
                            barRadius: 2,
                            cursorWidth: 0,
                            interact: false,
                            pixelRatio: 1,
                            forceDecode: true,
                            partialRender: true,
                            hideScrollbar: true
                        });

                        wavesurfer.load(`./assets/audio/${resp.caminhoAudio}`);
                        arrayMusic.push(wavesurfer);
                        attLikes();
                        carregarDuracao();
                    }
                    
                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

//FUNCTION PARA CONVERTER SEGUNDOS EM UM HORÁRIO VISÍVEL
function converterTempo(segundo) {
    var campoMinuto = Math.floor(segundo / 60);
    var campoSegundo = Math.floor(segundo % 60);
    if (campoSegundo < 10) {
        campoSegundo = '0' + campoSegundo;
    }
    return campoMinuto + ':' + campoSegundo;
}

//FUNCTION PARA ATUALIZAR A DURAÇÃO DA MUSICA
function carregarDuracao() {
    for (var i = 0; i < arrayMusic.length; i++) {
        var idWaveBruto = arrayMusic[i].container.id;
        var idWave = idWaveBruto.replace('waves', '');
        var duracao = document.getElementById(`duracao${idWave}`);
        var tempo = document.getElementById(`audio${idWave}`);

        duracao.innerHTML = converterTempo(tempo.duration);
    }
}

//FUNÇÃO PARA ATUALIZAR OS LIKES DAS MÚSICAS
function attLikes() {
    for (var i = 0; i < arrayMusic.length; i++) {
        var id = arrayMusic[i].container.id;
        var idConteudo = id.replace("waves", "");
        fetch("/validacoes/attLikes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idMusicServer: idConteudo,
                idUserServer: sessionStorage.ID_USUARIO
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    if (resposta.length == 1) {
                        document.querySelector(`#l${resposta[0].fkMusica}`).classList.add("likeRed");
                        document.querySelector(`#l${resposta[0].fkMusica}`).classList.remove("like");
                    }
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
                return false;
            }

        }).catch(function (erro) {
            console.log(erro);
        });
    }
}

//FUNÇÃO PARA LISTAR AS PLAYLISTS DO USUARIO
function addMusicPlaylist(idMusic) {
    if (validarSessao() == false) {
        AbrirLogin();
        return;
    }
    idMusica = idMusic;

    var card = document.querySelector(".sobreposi-playlist");
    card.style.display = "flex";

    fetch("/atualizar/listarPlaylist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUserServer: sessionStorage.ID_USUARIO
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                var lista = document.getElementById('playlists');
                lista.innerHTML = ``;
                for (let i = 0; i < resposta.length; i++) {
                    var resp = resposta[i];

                    var divAddPlaylist = document.createElement('div');
                    divAddPlaylist.className = 'playlist';
                    divAddPlaylist.innerHTML = resp.nomePlaylist;
                    lista.appendChild(divAddPlaylist);
                    divAddPlaylist.addEventListener('click', function() {
                        addPlaylist(resp.idPlaylist);
                    });
                }
            });

        } else {
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
            return false;
        }

    }).catch(function (erro) {
        console.log(erro);
    });

}

//FUNÇÃO PARA ADICIONAR A MUSICA A UMA DETERMINADA PLAYLIST
function addPlaylist(idPlaylist) {

    fetch("/atualizar/addPlaylist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idPlaylistServer: Number(idPlaylist),
            idMusicaServer: Number(idMusica)
        })
    }).then(function (resposta) {

        if (resposta.ok) {
        } else {
            if (resposta.status == 500) {
                alert('Essa musica já está nessa PlayList!');
            }
            console.log(resposta);
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
            return false;
        }

    }).catch(function (erro) {
        console.log(erro);
    });

}

//FUNÇÃO PARA SOBREPOR A LISTA DAS PLAYLISTS
var sobrePlay = document.querySelector('.sobreposi-playlist');

sobrePlay.addEventListener('click', function () {
    sobrePlay.style.display = 'none';
});
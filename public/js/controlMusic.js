//FUNÇÃO PARA ATUALIZAR OS LIKES DAS MÚSICAS
function attLikes() {
    if (!validarSessao()) {
        return
    } else {
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
                    console.log("Houve um erro ao tentar atualizar os likes!");

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

//EVENTO QUE CHAMA FUNÇÃO CLICK (QUE FAZ AS MUSICAS TOCAREM)
document.addEventListener('click', click);

//FUNCTION QUE DA LIKE NAS MÚSICAS
function likes(idMusica) {
    var classClick = document.getElementById(`l${idMusica}`).classList;

    if (classClick == 'like' && validarSessao() == true) {
        document.getElementById(`l${idMusica}`).classList.add("likeRed");
        document.getElementById(`l${idMusica}`).classList.remove("like");
        addLike(idMusica);
    } else if (classClick == 'like' && validarSessao() == false) {
        AbrirLogin();
    } else if (classClick == 'likeRed' && validarSessao() == true) {
        document.getElementById(`l${idMusica}`).classList.add("like");
        document.getElementById(`l${idMusica}`).classList.remove("likeRed");
        removeLike(idMusica);
    }
}

//VALIDANDO SE A MÚSICA ESTÁ TOCANDO E FAZ ALGUMAS COISAS NAS FUNÇÕES
setInterval(() => {
    for (var i = 0; i < arrayMusic.length; i++) {
        var idBruto = arrayMusic[i].container.id;
        var idMusica = idBruto.replace('waves', '');
        var tamanhoTotal = document.getElementById(`duracao${idMusica}`);
        var tempo = document.getElementById(`audio${idMusica}`);
        var progressTag = document.querySelector('progress');
        var artista = document.getElementById(`artista${idMusica}`);
        var musica = document.getElementById(`musica${idMusica}`);
        var tocando = document.getElementById(`nmrMusica${idMusica}`);
        var equalizador = document.getElementById(`equalizador${idMusica}`);
        var player = document.querySelector(`.player_bottom`);
        var like = document.getElementById(`l${idMusica}`);
        var fotoMusica = document.getElementById(`foto${idMusica}`);
        var fotoBottom = document.getElementById(`foto_bottom`);

        if (arrayMusic[i].getDuration() == arrayMusic[i].getCurrentTime() &&
            arrayMusic[i].getCurrentTime() != 0) {
            arrayMusic[i].stop();
            if (arrayMusic[i + 1] == undefined) {
                arrayMusic[0].play();
            } else {
                arrayMusic[i + 1].play();
            }
        }

        if (tamanhoTotal.innerHTML == "NaN:NaN") {
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
            fotoBottom.style.backgroundImage = fotoMusica.style.backgroundImage;

            var divFinal = document.getElementById(`divFinal_bottom`);
            divFinal.innerHTML = `
            <div id="like_bottom" class="like" onclick="likes(${idMusica})">
            </div>
            <h1 onclick="addMusicPlaylist(${idMusica})">+</h1>
            `;
            var botoes = document.getElementById(`controls_bottom`);
            botoes.innerHTML = `
            <img src="./assets/picture/inicio.png" class="menor" onclick="controls('back',${idMusica})">
            <img src="./assets/picture/play.png" class="maior" id="play_bottom" onclick="controls('play',${idMusica})">
            <img src="./assets/picture/pause.png" class="maior" id="pause_bottom" onclick="controls('pause',${idMusica})">
            <img src="./assets/picture/fim.png" class="menor" onclick="controls('next',${idMusica})">
            `;

            var classDoLike = like.classList;
            var likeBottom = document.getElementById(`like_bottom`);

            if (classDoLike == 'like') {
                likeBottom.classList.add(`like`);
                likeBottom.classList.remove(`likeRed`);
            } else {
                likeBottom.classList.add(`likeRed`);
                likeBottom.classList.remove(`like`);
            }
        } else {
            if (arrayMusic[i].getCurrentTime() != 0) {
                musica.style.color = 'var(--contraste-color)';
            } else {
                musica.style.color = "var(--textos2-color)";
            }
            tocando.style.display = "flex";
            equalizador.style.display = "none";
        }
    }
}, 1000);

//FUNÇÃO PARA CONTROLAR AS MUSICAS NO PLAYER DO BOTTOM
function controls(funcao, idMusica) {
    var play = document.getElementById(`play_bottom`);
    var pause = document.getElementById(`pause_bottom`);

    for (let i = 0; i < arrayMusic.length; i++) {
        var idBruto = arrayMusic[i].container.id;
        var idWave = idBruto.replace('waves', '');

        if (idWave == idMusica) {
            if (funcao == 'play') {
                arrayMusic[i].playPause();
                play.style.display = 'none';
                pause.style.display = 'block';
            } else if (funcao == 'pause') {
                arrayMusic[i].playPause();
                play.style.display = 'block';
                pause.style.display = 'none';
            } else if (funcao == 'next') {
                arrayMusic[i].stop();
                if (arrayMusic[i + 1] == undefined) {
                    arrayMusic[0].play();
                } else {
                    arrayMusic[i + 1].play();
                }
            } else {
                arrayMusic[i].stop();
                if (arrayMusic[i - 1] == undefined) {
                    arrayMusic[0].play();
                } else {
                    arrayMusic[i - 1].play();
                }
            }
        }
    }
}

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

//FUNÇÃO PARA LISTAR AS PLAYLISTS DO USUARIO
function addMusicPlaylist(idMusic) {
    if (validarSessao() == false) {
        AbrirLogin();
        return;
    }
    idMusicas = idMusic;

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
            console.log("Houve um erro ao tentar listas as playlists!");

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
            idMusicaServer: Number(idMusicas)
        })
    }).then(function (resposta) {

        if (resposta.ok) {
        } else {
            if (resposta.status == 500) {
                alert('Essa musica já está nessa PlayList!');
            }
            console.log(resposta);
            console.log("Houve um erro ao tentar vincular uma playlist com usuario!");

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
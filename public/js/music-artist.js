arrayMusic = [];

//ADICIONAR AS MÚSICAS DA PLAYLIST
function atualizarMusicas(){
    var foto = document.getElementById(`foto_Artista`);
    foto.style.backgroundImage = `url("/assets/picture/${sessionStorage.FOTO_ARTISTA}")`;

    var nome = document.getElementById(`nome_Artista`);
    nome.innerHTML = sessionStorage.NOME_ARTISTA;

    var genero = document.getElementById(`genero_Artista`);
    genero.innerHTML = sessionStorage.GENERO_ARTISTA;

    fetch("/atualizar/atualizarMusicasArtista", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            idPlaylistServer: sessionStorage.ID_ARTISTA
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var divPai = document.getElementById("playlist");
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
                        divFoto.id = `foto${resp.idMusica}`

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

                        divFinal.innerHTML += `
                        <div class="like" id="l${resp.idMusica}" onclick="likes(${resp.idMusica})">
                        </div>
                        <h1 onclick="addMusicPlaylist(${resp.idMusica})">
                        +
                        </h1>
                        `

                        // var like = document.createElement('div');
                        // like.className = 'like';
                        // like.id = 'l' + resp.idMusica;
                        // divFinal.appendChild(like);
                        // like.addEventListener('click', function(){
                        //     likes(resp.idMusica);
                        // });

                        // var addPlaylist = document.createElement('h1');
                        // addPlaylist.innerHTML = '+';
                        // divFinal.appendChild(addPlaylist);
                        // addPlaylist.onclick = function (){
                        //     addMusicPlaylist(resp.idMusica);
                        // };
                        // addPlaylist.addEventListener('click', ()=>{
                        //     addMusicPlaylist(resp.idMusica);
                        // });

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
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

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
function likes (idMusica){
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

            if(classDoLike == 'like'){
                likeBottom.classList.add(`like`);
                likeBottom.classList.remove(`likeRed`);
            }else{
                likeBottom.classList.add(`likeRed`);
                likeBottom.classList.remove(`like`);
            }
        } else {
            if(arrayMusic[i].getCurrentTime()!= 0){
                musica.style.color = 'var(--contraste-color)';
            }else{
                musica.style.color = "var(--textos2-color)";
            }
            tocando.style.display = "flex";
            equalizador.style.display = "none";
        }
    }
}, 1000);

//FUNÇÃO PARA CONTROLAR AS MUSICAS NO PLAYER DO BOTTOM
function controls(funcao, idMusica){
    var play = document.getElementById(`play_bottom`);
    var pause = document.getElementById(`pause_bottom`);

    for(let i = 0; i < arrayMusic.length ; i++){
        var idBruto = arrayMusic[i].container.id;
        var idWave = idBruto.replace('waves', '');

        if(idWave == idMusica){
            if(funcao == 'play' ){
                arrayMusic[i].playPause();
                play.style.display = 'none';
                pause.style.display = 'block';
            }else if(funcao == 'pause'){
                arrayMusic[i].playPause();
                play.style.display = 'block';
                pause.style.display = 'none';
            }else if(funcao == 'next'){
                arrayMusic[i].stop();
                if(arrayMusic[i+1] == undefined){
                    arrayMusic[0].play();
                }else{
                    arrayMusic[i+1].play();
                }
            }else{
                arrayMusic[i].stop();
                if(arrayMusic[i-1] == undefined){
                    arrayMusic[0].play();
                }else{
                    arrayMusic[i-1].play();
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
            idMusicaServer: Number(idMusicas)
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
//ARRAY QUE SALVA AS MÚSICAS
var arrayMusic = [];

var idMusicas = 0;

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
                        `;
                        
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
            throw ('Houve um erro ao listar musicas!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

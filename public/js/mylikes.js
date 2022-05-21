let arrayMusic = ['0'];

//FUNÇÃO PARA PEGAR AS MUSICAS DO BANCO DE DADOS
function listarFavoritas() {
    var idUser = sessionStorage.ID_USUARIO;
    var feed = document.getElementById("music");
    feed.innerHTML = "";
    arrayMusic = ['0'];
    fetch(`/atualizar/listarFavoritas/${idUser}`).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    // criando e manipulando elementos do HTML via JavaScript
                    var divPublicacao = document.createElement("div");
                    divPublicacao.className = "player";
                    divPublicacao.id = "p" + publicacao.idMusica;

                    var sobre = document.createElement("div");
                    sobre.className = 'sobre';
                    sobre.id = (i+1);

                    var divFoto = document.createElement("div");
                    divFoto.className = "foto";
                    divFoto.style.backgroundImage = `url("/assets/picture/${publicacao.caminhoFoto}")`;

                    var divTitles = document.createElement('div');
                    divTitles.className = 'titles';

                    var music = document.createElement('h2');
                    music.className = 'title-music';
                    music.innerHTML = publicacao.musica;

                    var artista = document.createElement('h3');
                    artista.className = 'title-artist';
                    artista.innerHTML = publicacao.artista;

                    var divWaves = document.createElement('div');
                    divWaves.className = 'waveform'
                    divWaves.id = 'waves' + publicacao.idMusica
                    
                    var divFinal = document.createElement('div');
                    divFinal.className = 'final';

                    var timeMusic = document.createElement('span');
                    timeMusic.id = 'duracao' + (i+1);

                    var like = document.createElement('div');
                    like.className = 'likeRed';
                    like.id = 'l'+publicacao.idMusica;

                    var add = document.createElement('h1');
                    add.innerHTML = '+';

                    feed.appendChild(divPublicacao);
                    divPublicacao.appendChild(sobre);
                    divPublicacao.appendChild(divFoto);
                    divPublicacao.appendChild(divTitles);
                    divTitles.appendChild(music);
                    divTitles.appendChild(artista);
                    divPublicacao.appendChild(divWaves);
                    divPublicacao.appendChild(divFinal);
                    divFinal.appendChild(timeMusic);
                    divFinal.appendChild(like);
                    divFinal.appendChild(add);

                    var wavesurfer = WaveSurfer.create({
                        container: '#waves' + publicacao.idMusica,
                        waveColor: '#a8a8a8',
                        partialRender: false,
                        progressColor: '#01a0c8',
                        height: 50,
                        responsive: true,
                        barWidth: 3,
                        barRadius: 2,
                        cursorWidth: 0,
                        interact: false,
                        backend: 'MediaElement'
                    });
                    wavesurfer.load(`./assets/audio/${publicacao.caminhoAudio}`);
                    var adicionar = arrayMusic.push(wavesurfer);
                    //carregarDuracao();
    

                }

            });

            setTimeout(() => {
                carregarDuracao();
             }, "8000")

        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

//FUNÇÃO PARA CONSEGUIR REMOVER A MUSICA
document.addEventListener('click', function (event) {
    var classClick = event.target.className;
    var idClick = event.target.id;
    var idConteudo = idClick.replace(/^./, "");

    for(var music = 1; music< arrayMusic.length ;music++){
        if(idClick == music){
            for(var i = 1; i < arrayMusic.length ; i++){
                    if(arrayMusic[i].isPlaying() == true){
                        if(i != idClick){
                        arrayMusic[i].stop();
                        }
                    }       
                }
            arrayMusic[idClick].playPause();
            }
        }

 if (classClick == 'likeRed' && validarSessao() == true){
        removeLike(idConteudo);
        var feed = document.getElementById("p" + idConteudo);
        feed.style.display = "none";
    }

});

//FUNCTION PARA ATUALIZAR A DURAÇÃO DA MUSICA
function carregarDuracao(){

    console.log(arrayMusic.length);
    for(var i = 1 ; i < arrayMusic.length ; i ++){
        var duracao = document.getElementById(`duracao${i}`);
            duracao.innerHTML = converterTempo(arrayMusic[i].getDuration());
    }    
}

//FUNCTION PARA CONVERTER SEGUNDOS EM UM HORÁRIO VISÍVEL
function converterTempo(segundo){
    var campoMinuto = Math.floor(segundo / 60);
    var campoSegundo = Math.floor(segundo % 60);
    if(campoSegundo < 10){
        campoSegundo = '0' + campoSegundo;
    }

    return campoMinuto + ':' + campoSegundo;
}

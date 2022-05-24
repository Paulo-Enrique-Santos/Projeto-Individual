//ARRAY QUE SALVA AS MÚSICAS
var arrayMusic = ['0'];

let classAtual = 'like';
//EVENTO QUE CHAMA A FUNÇÃO PARA ATUALIZAR A DURAÇÃO DA MÚSICA
//arrayMusic[arrayMusic.length].on('ready', carregarDuracao);

//EVENTO QUE CHAMA FUNÇÃO CLICK (QUE FAZ AS MUSICAS TOCAREM)
document.addEventListener('click', click);

document.addEventListener('click', function (event) {
    var classClick = event.target.className;
    var idClick = event.target.id;
    var idConteudo = idClick.replace(/^./, "");

    if(classClick == 'like' && validarSessao() == true){
        document.querySelector(`#${idClick}`).classList.add("likeRed");
        document.querySelector(`#${idClick}`).classList.remove("like");
        addLike(idConteudo);
        } else if (classClick == 'like' && validarSessao() == false){
        AbrirLogin();
    } else if (classClick == 'likeRed' && validarSessao() == true){
        document.querySelector(`#${idClick}`).classList.add("like");
        document.querySelector(`#${idClick}`).classList.remove("likeRed");
        removeLike(idConteudo);
    }

});

//FUNCTION CLICK QUE FAZ AS MUSICAS TOCAREM
function click(event){
    var click = event.target.id;

    for(var music = 1; music< arrayMusic.length ;music++){
        if(click == music){
            for(var i = 1; i < arrayMusic.length ; i++){
                    if(arrayMusic[i].isPlaying() == true){
                        if(i != click){
                        arrayMusic[i].stop();
                        }
                    }       
                }
            arrayMusic[click].playPause();
            }
        }
}
//FUNÇÃO PARA PEGAR AS MUSICAS DO BANCO DE DADOS
function atualizarMusic() {
    fetch("/atualizar/listarMusic").then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var feed = document.getElementById("music");
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];
                    var verMusica = document.getElementById("l" + publicacao.idMusica);
                    var artist = document.getElementById("artista" + publicacao.idMusica);

                    if(verMusica != null){
                    artist.innerHTML += ', ' + publicacao.artista;
                    } else {

                        // criando e manipulando elementos do HTML via JavaScript
                        var divPublicacao = document.createElement("div");
                        divPublicacao.className = "player";

                        var sobre = document.createElement("div");
                        sobre.className = 'sobre';
                        sobre.id = publicacao.idMusica;

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
                        artista.id = 'artista' + publicacao.idMusica;
                        artista.innerHTML += publicacao.artista;

                        var divWaves = document.createElement('div');
                        divWaves.className = 'waveform'
                        divWaves.id = 'waves' + publicacao.idMusica;
                        
                        var divFinal = document.createElement('div');
                        divFinal.className = 'final';

                        var timeMusic = document.createElement('span');
                        timeMusic.id = 'duracao' + publicacao.idMusica;

                        var like = document.createElement('div');
                        like.className = 'like';
                        like.id = 'l'+ publicacao.idMusica;

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
                            progressColor: '#01a0c8',
                            height: 50,
                            responsive: true,
                            barWidth: 3,
                            barRadius: 2,
                            cursorWidth: 0,
                            interact: false,
                            pixelRatio: 1
                        });
                        
                        wavesurfer.load(`./assets/audio/${publicacao.caminhoAudio}`);
                        var adicionar = arrayMusic.push(wavesurfer);
                        //carregarDuracao();
                        attLikes();
                        carregarDuracao();
                    }
                    
                }

            });
            // setTimeout(() => {
            //     carregarDuracao();
            //     attLikes();
            //  }, "8000")

        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
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

//FUNCTION PARA ATUALIZAR A DURAÇÃO DA MUSICA
function carregarDuracao(){

    for(var i = 1 ; i < arrayMusic.length ; i ++){
        var duracao = document.getElementById(`duracao${i}`);
            duracao.innerHTML = converterTempo(arrayMusic[i].getDuration());
    }    
}

//FUNÇÃO PARA ATUALIZAR OS LIKES DAS MÚSICAS
function attLikes(){
console.log(arrayMusic.length);
    for(var i = 1 ; i < arrayMusic.length ; i ++){

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

                if(resposta.length == 1){
                    console.log(`#l${resposta[0].fkMusica}`);
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
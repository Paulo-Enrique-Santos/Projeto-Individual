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
                    <div class="card" onclick="verMusicasPlaylist(${publicacao.idPlaylist}, '${publicacao.nomePlaylist}')">
                        <div class="foto">
                            <img src="./assets/picture/playlist.png">
                            <div class="botao-play">
                                <img src="./assets/picture/play80.png">
                            </div>
                        </div>
                        <h2>${publicacao.nomePlaylist}</h2>
                    </div> 
                `
                }
            });
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

//FUNÇÃO PARA ENVIAR PARA A OUTRA PÁGINA PARA CARREGAR AS MÚSICAS
function verMusicasPlaylist(idPlaylist, nome){
    sessionStorage.ID_PLAYLIST = idPlaylist;
    sessionStorage.ID_NOMEPLAYLIST = nome;

    window.location.href =  "playlist.html";
}
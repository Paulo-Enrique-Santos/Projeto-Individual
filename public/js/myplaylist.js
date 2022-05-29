//FUNÇÃO PARA PEGAR OS ARTISTAS DO BANCO DE DADOS
function atualizarPlaylist() {
    var idUser = sessionStorage.ID_USUARIO;
    fetch(`/atualizar/atualizarPlaylist/${idUser}`).then(function (resposta) {
        if (resposta.ok) {
            var feed = document.getElementById("playlist");
            feed.innerHTML = "";
            feed.innerHTML += `
            <div class="criar-musicas">
                <div>
                    <h2>Criar uma Nova PlayList</h2>
                </div>
                <div class="criar">
                    <input id="inputNomePlaylist" type="text" placeholder="Nome da PlayList">
                    <button class="botao" onclick="criarPlaylist()">Criar PlayList</button>
                </div>
            </div>
            `
            if (resposta.status == 204) {
                feed.innerHTML = `
                <h1 class="resultados">Nenhuma PlayList encontrada.</h1>
                <div class="criar-musicas">
                    <div>
                        <h2>Criar uma Nova PlayList</h2>
                    </div>
                    <div class="criar">
                        <input id="inputNomePlaylist" type="text" placeholder="Nome da PlayList">
                        <button class="botao" onclick="criarPlaylist()">Criar PlayList</button>
                    </div>
                </div>
                `
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
                            <div class="music">
                                <div class="foto">

                                </div>

                                <div class="titles-musics">
                                    <h2>Red Eye</h2>
                                    <h3>Justin Bieber</h3>  
                                </div>
                                <img src="./assets/picture/delete-list.png">
                            </div>
                        </div>
                    </div>

                </div> 

                `
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

function criarPlaylist(){

    var idUser = sessionStorage.ID_USUARIO;
    var nomePlaylist = inputNomePlaylist.value;

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
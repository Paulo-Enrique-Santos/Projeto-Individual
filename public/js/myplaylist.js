//FUNÇÃO PARA PEGAR OS ARTISTAS DO BANCO DE DADOS
function atualizarPlaylist() {
    var idUser = sessionStorage.ID_USUARIO;
    fetch(`/atualizar/atualizarPlaylist/${idUser}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("playlist");
                feed.innerHTML = "Nenhum resultado encontrado."
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];


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
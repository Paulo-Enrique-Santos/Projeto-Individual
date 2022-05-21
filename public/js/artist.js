//FUNÇÃO PARA PEGAR OS ARTISTAS DO BANCO DE DADOS
function atualizarGenero() {
    fetch("/atualizar/listarGenero").then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var feed = document.getElementById("index");
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    // criando e manipulando elementos do HTML via JavaScript
                    var divPublicacao = document.createElement("div");
                    divPublicacao.className = "card";
                    var h3Title = document.createElement("h3");
                    var ulFotos = document.createElement("ul");
                    ulFotos.id = publicacao.genero;
                    atualizarFoto(publicacao.genero);

                    h3Title.innerHTML = publicacao.genero;
                    divPublicacao.appendChild(h3Title);
                    divPublicacao.appendChild(ulFotos);
                    feed.appendChild(divPublicacao);
                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

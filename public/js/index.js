//FUNCTIONS ##############################################################################################################
//FUNÇÃO PARA PEGAR AS MUSICAS DO BANCO DE DADOS
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

//FUNÇÃO PARA PE
function atualizarFoto(id) {
    var idVar = id

    console.log(idVar, 'TESTE')
    fetch("/atualizar/listarFoto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            idServer: idVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var feed = document.getElementById(idVar);
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    // criando e manipulando elementos do HTML via JavaScript
                    var fotoArtista = document.createElement("li");
                    fotoArtista.id = publicacao.idMusica;
                    fotoArtista.style.backgroundImage = `url('./assets/picture/${publicacao.caminhoFoto}')`

                    var divSobre = document.createElement("div");
                    divSobre.className = "sobre-index";
                    fotoArtista.appendChild(divSobre);

                    var nomeArtista = document.createElement("h3");
                    divSobre.appendChild(nomeArtista);

                    feed.appendChild(fotoArtista);
                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

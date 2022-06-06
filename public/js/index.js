//FUNÇÃO PARA PEGAR TODOS OS GENEROS
function atualizarGenero() {
    fetch("/atualizar/listarGenero").then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                var feed = document.getElementById("index");
                for (let i = 0; i < resposta.length; i++) {
                    var resp = resposta[i];

                    // criando e manipulando elementos do HTML via JavaScript
                    var divresp = document.createElement("div");
                    divresp.className = "card";
                    var h3Title = document.createElement("h3");
                    var ulFotos = document.createElement("ul");
                    ulFotos.id = resp.genero;
                    atualizarFoto(resp.genero);

                    h3Title.innerHTML = resp.genero;
                    divresp.appendChild(h3Title);
                    divresp.appendChild(ulFotos);
                    feed.appendChild(divresp);
                }

            });
        } else {
            throw ('Houve um erro ao tentar coletar os generos do banco de dados!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

//FUNÇÃO PARA PEGAR AS FOTOS DOS ARTISTAS 
function atualizarFoto(id) {
    var idVar = id

    fetch("/atualizar/listarFoto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idServer: idVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                var feed = document.getElementById(idVar);
                for (let i = 0; i < resposta.length; i++) {
                    var resp = resposta[i];

                    var fotoArtista = document.createElement("li");
                    fotoArtista.id = resp.idMusica;
                    fotoArtista.style.backgroundImage = `url('./assets/picture/${resp.caminhoFoto}')`

                    var divSobre = document.createElement("div");
                    divSobre.className = "sobre-index";
                    fotoArtista.appendChild(divSobre);

                    var nomeArtista = document.createElement("h3");
                    divSobre.appendChild(nomeArtista);

                    feed.appendChild(fotoArtista);
                }

            });
        } else {
            throw ('Houve um erro ao atualizar as fotos dos artistas!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

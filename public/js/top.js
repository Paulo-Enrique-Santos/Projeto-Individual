//FUNÇÃO PARA PEGAR AS MUSICAS DO BANCO DE DADOS
function atualizarTopMusica() {
    fetch("/atualizar/topMusica").then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var fotoPrincipal = document.getElementById(`fotoPrincipal`);
                fotoPrincipal.style.backgroundImage = `url("/assets/picture/${resposta[0].caminhoFoto}")`;

                var cardTop = document.getElementById(`podioMusicas`);
                var contador = 1;
                for (let i = 0; i < resposta.length; i++) {
                    var resp = resposta[i];
                    
                    cardTop.innerHTML += `
                    <div class="posicaoTop">
                        <h1>
                            ${contador}º
                        </h1>
                        <div class="fotoArtista" id="fotoMusica${contador}">
                        </div>
                        <div>
                            <h2>${resp.musica}</h2>
                            <h3>${resp.artista}</h3>
                            <h5>${resp.likes} LIKES</h5>
                        </div>
                    </div>
                    `;

                    var fotoArtista = document.getElementById(`fotoMusica${contador}`);
                    fotoArtista.style.backgroundImage = `url("/assets/picture/${resp.caminhoFoto}")`;

                    contador++;
                }

            });
            // setTimeout(() => {
            //     carregarDuracao();
            //     attLikes();
            //  }, "8000")

        } else {
            throw ('Houve um erro ao tentar atualizar o top!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

//FUNÇÃO PARA PEGAR AS MUSICAS DO BANCO DE DADOS
function atualizarTopArtista() {
    fetch("/atualizar/topArtista").then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var fotoPrincipal = document.getElementById(`fotoPrincipalArtista`);
                fotoPrincipal.style.backgroundImage = `url("/assets/picture/${resposta[0].caminhoFoto}")`;

                var cardTop = document.getElementById(`podioArtistas`);
                var contador = 1;
                for (let i = 0; i < resposta.length; i++) {
                    var resp = resposta[i];
                    cardTop.innerHTML += `
                    <div class="posicaoTop">
                        <h1>
                            ${contador}º
                        </h1>
                        <div class="fotoArtista" id="fotoArtista${contador}">
                        </div>
                        <div>
                            <h2>${resp.artista}</h2>
                            <h3>${resp.genero}</h3>
                            <h5>${resp.likes} LIKES</h5>
                        </div>
                    </div>
                    `;

                    var fotoArtista = document.getElementById(`fotoArtista${contador}`);
                    fotoArtista.style.backgroundImage = `url("/assets/picture/${resp.caminhoFoto}")`;

                    contador++;
                }

            });
            // setTimeout(() => {
            //     carregarDuracao();
            //     attLikes();
            //  }, "8000")

        } else {
            throw ('Houve um erro ao tentar atualizar o top!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}
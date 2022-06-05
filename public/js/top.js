//FUNÇÃO PARA PEGAR AS MUSICAS DO BANCO DE DADOS
function atualizarTopMusica() {
    fetch("/atualizar/topMusica").then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    if(i == 0){
                        var foto = document.getElementById("primeira_foto_musica");
                        var musica = document.getElementById("primeira_nome_musica");
                        var likes = document.getElementById("primeira_likes_musica");

                        foto.style.backgroundImage = `url("/assets/picture/${publicacao.caminhoFoto}")`;
                        musica.innerHTML = publicacao.musica;
                        likes.innerHTML = `${publicacao.likes} likes`;

                    } else if( i == 1){
                        var foto = document.getElementById("segunda_foto_musica");
                        var musica = document.getElementById("segunda_nome_musica");
                        var likes = document.getElementById("segunda_likes_musica");

                        foto.style.backgroundImage = `url("/assets/picture/${publicacao.caminhoFoto}")`;
                        musica.innerHTML = publicacao.musica;
                        likes.innerHTML = `${publicacao.likes} likes`;

                    } else {
                        var foto = document.getElementById("terceira_foto_musica");
                        var musica = document.getElementById("terceira_nome_musica");
                        var likes = document.getElementById("terceira_likes_musica");

                        foto.style.backgroundImage = `url("/assets/picture/${publicacao.caminhoFoto}")`;
                        musica.innerHTML = publicacao.musica;
                        likes.innerHTML = `${publicacao.likes} likes`;

                    }
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
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    if(i == 0){
                        var foto = document.getElementById("primeira_foto_artista");
                        var artista = document.getElementById("primeira_nome_artista");
                        var likes = document.getElementById("primeira_likes_artista");

                        foto.style.backgroundImage = `url("/assets/picture/${publicacao.caminhoFoto}")`;
                        artista.innerHTML = publicacao.artista;
                        likes.innerHTML = `${publicacao.likes} likes`;

                    } else if( i == 1){
                        var foto = document.getElementById("segunda_foto_artista");
                        var artista = document.getElementById("segunda_nome_artista");
                        var likes = document.getElementById("segunda_likes_artista");

                        foto.style.backgroundImage = `url("/assets/picture/${publicacao.caminhoFoto}")`;
                        artista.innerHTML = publicacao.artista;
                        likes.innerHTML = `${publicacao.likes} likes`;

                    } else {
                        var foto = document.getElementById("terceira_foto_artista");
                        var artista = document.getElementById("terceira_nome_artista");
                        var likes = document.getElementById("terceira_likes_artista");

                        foto.style.backgroundImage = `url("/assets/picture/${publicacao.caminhoFoto}")`;
                        artista.innerHTML = publicacao.artista;
                        likes.innerHTML = `${publicacao.likes} likes`;

                    }
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
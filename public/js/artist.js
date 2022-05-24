//FUNÇÃO PARA PEGAR OS ARTISTAS DO BANCO DE DADOS
function atualizarArtista() {
    fetch("/atualizar/listarArtista").then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var left = document.getElementById("left");
                var right = document.getElementById("right");
                var onde = right;
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    if(onde == right){
                        onde = left;
                    } else {
                        onde = right;
                    }
                    // criando e manipulando elementos do HTML via JavaScript
                    var divPublicacao = document.createElement("div");
                    divPublicacao.className = "card";
                    var foto = document.createElement('div');
                    foto.className = 'foto'
                    foto.style.backgroundImage = `url("/assets/picture/${publicacao.caminhoFoto}")`
                    var divTitle = document.createElement('div');
                    divTitle.className = 'titulos';
                    divPublicacao.appendChild(foto);
                    divPublicacao.appendChild(divTitle);

                    var artist = document.createElement('h1');
                    artist.innerHTML = `${publicacao.artista}`;
                    

                    var genero = document.createElement('h2');
                    genero.innerHTML = `${publicacao.genero}`;

                    divTitle.appendChild(artist);
                    divTitle.appendChild(genero);

                    var divDesc = document.createElement('div');
                    divDesc.className = 'titulos'
                    divDesc.innerHTML = `
                    <h4><span>${publicacao.artista}</span> do gênero <span>${publicacao.genero}</span>
                    conta com <span id="musics${}">9 músicas</span> cadastradas, e já 
                    acumula <span id="likes">312 likes</span> entre os nossos 
                    usuarios.</h4>
                    `

                    divPublicacao.appendChild(divDesc);

                    onde.appendChild(divPublicacao);


                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

//FUNÇÃO PARA PEGAR OS DADOS ARTISTAS DO BANCO DE DADOS
function atualizarArtista(idArtista) {
    fetch(`/atualizar/listarArtista/${idArtista}`).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var left = document.getElementById("left");
                var right = document.getElementById("right");
                var onde = right;
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    if(onde == right){
                        onde = left;
                    } else {
                        onde = right;
                    }
                    // criando e manipulando elementos do HTML via JavaScript
                    var divPublicacao = document.createElement("div");
                    divPublicacao.className = "card";
                    var foto = document.createElement('div');
                    foto.className = 'foto'
                    foto.style.backgroundImage = `url("/assets/picture/${publicacao.caminhoFoto}")`
                    var divTitle = document.createElement('div');
                    divTitle.className = 'titulos';
                    divPublicacao.appendChild(foto);
                    divPublicacao.appendChild(divTitle);

                    var artist = document.createElement('h1');
                    artist.innerHTML = `${publicacao.artista}`;
                    

                    var genero = document.createElement('h2');
                    genero.innerHTML = `${publicacao.genero}`;

                    divTitle.appendChild(artist);
                    divTitle.appendChild(genero);

                    var divDesc = document.createElement('div');
                    divDesc.className = 'titulos'
                    divDesc.innerHTML = `
                    <h4><span>${publicacao.artista}</span> do gênero <span>${publicacao.genero}</span>
                    conta com <span id="musics">9 músicas</span> cadastradas, e já 
                    acumula <span id="likes">312 likes</span> entre os nossos 
                    usuarios.</h4>
                    `

                    divPublicacao.appendChild(divDesc);

                    onde.appendChild(divPublicacao);


                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}
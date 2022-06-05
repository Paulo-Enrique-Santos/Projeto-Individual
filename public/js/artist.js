//FUNÇÃO PARA PEGAR OS ARTISTAS DO BANCO DE DADOS
function atualizarArtista() {
    var left = document.getElementById("left");
    var right = document.getElementById("right");

    left.className = "colunas";
    right.className = "colunas"

    fetch("/atualizar/listarArtista").then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var onde = right;
                for (let i = 0; i < resposta.length; i++) {
                    var resp = resposta[i];

                    if(onde == right){
                        onde = left;
                    } else {
                        onde = right;
                    }

                    onde.innerHTML += `
                    <div class="card" onclick="musicaArtista(${resp.idArtista},'${resp.artista}','${resp.genero}','${resp.caminhoFoto}')">
                        <div class="foto" id="foto-${resp.idArtista}">
                        </div>
                        <div class="titulos">
                            <h1>${resp.artista}</h1>
                            <h2>${resp.genero}</h2>
                        </div>
                        <div class="titulos">
                            <h4><span>${resp.artista}</span> do gênero <span>${resp.genero}</span>
                            conta com <span id="musics${resp.idArtista}">9 músicas</span> cadastradas, e já 
                            acumula <span id="likes${resp.idArtista}">312 likes</span> entre os nossos 
                            usuarios.</h4>
                        </div>
                    </div> 
                    `
                    var foto = document.getElementById(`foto-${resp.idArtista}`);
                    foto.style.backgroundImage = `url("/assets/picture/${resp.caminhoFoto}")`;

                    // criando e manipulando elementos do HTML via JavaScript
                    // var divPublicacao = document.createElement("div");
                    // divPublicacao.className = "card";
                    // var foto = document.createElement('div');
                    // foto.className = 'foto'
                    // foto.style.backgroundImage = `url("/assets/picture/${publicacao.caminhoFoto}")`
                    // var divTitle = document.createElement('div');
                    // divTitle.className = 'titulos';
                    // divPublicacao.appendChild(foto);
                    // divPublicacao.appendChild(divTitle);

                    // var artist = document.createElement('h1');
                    // artist.innerHTML = `${publicacao.artista}`;
                    

                    // var genero = document.createElement('h2');
                    // genero.innerHTML = `${publicacao.genero}`;

                    // divTitle.appendChild(artist);
                    // divTitle.appendChild(genero);

                    // var divDesc = document.createElement('div');
                    // divDesc.className = 'titulos'
                    // divDesc.innerHTML = `
                    // <h4><span>${publicacao.artista}</span> do gênero <span>${publicacao.genero}</span>
                    // conta com <span id="musics${publicacao.idArtista}">9 músicas</span> cadastradas, e já 
                    // acumula <span id="likes${publicacao.idArtista}">312 likes</span> entre os nossos 
                    // usuarios.</h4>
                    // `

                    // divPublicacao.appendChild(divDesc);

                    // onde.appendChild(divPublicacao);
                    attDadosArtista(resp.idArtista);
                }
            });
        } else {
            throw ('Houve um erro ao tentar atualizar Artista!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

//FUNÇÃO PARA ENVIAR OS DADOS DO ARTISTA PARA OUTRA PÁGINA
function musicaArtista(idArtista, nome, genero, foto){
    sessionStorage.ID_ARTISTA = idArtista;
    sessionStorage.NOME_ARTISTA = nome;
    sessionStorage.GENERO_ARTISTA = genero;
    sessionStorage.FOTO_ARTISTA = foto;

    window.location.href = "music-artist.html";
}

//FUNÇÃO PARA PEGAR OS DADOS ARTISTAS DO BANCO DE DADOS
function attDadosArtista(idArtista) {
    fetch(`/atualizar/attDadosArtista/${idArtista}`).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                for (let i = 0; i < resposta.length; i++) {
                    var resp = resposta[i];
                    let musics = document.getElementById(`musics${idArtista}`);
                    let likes = document.getElementById(`likes${idArtista}`);

                    musics.innerHTML = `${resp.musics} músicas`
                    likes.innerHTML = `${resp.likes} likes`

                }

            });
        } else {
            throw ('Houve um erro ao tentar coletar os dados do artista!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}
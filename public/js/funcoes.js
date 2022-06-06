var arrayPesquisaMusica = [];
var arrayPesquisaArtista = [];
var arrayPesquisaGenero = [];

// VALIDAR SE ESTÁ LOGADO OU NÃO
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null) {
        document.querySelector('.btns').style.display = 'none'
        document.querySelector('.logado').style.display = 'flex'
        name_user.innerHTML = nome;
        return true;
    } else {
        document.querySelector('.btns').style.display = 'flex'
        document.querySelector('.logado').style.display = 'none'
        name_user.innerHTML = nome;
        return false;   
    }
}

// SAIR DA CONTA DO USUARIO
function limparSessao() {
    sessionStorage.clear();
    window.location = "index.html";
}

// CARREGAMENTO (LOADING) CADASTRO
function aguardarCadastro() {
    var divAguardar = document.getElementById("loading_cadastro");
    divAguardar.style.display = "flex";
    card_erro_cadastro.style.display = "none"
}

// ENCERRAMENTO DO (LOADING) E CARD DE ERROS
function finalizarAguardarCadastro(texto) {
    var divAguardar = document.getElementById("loading_cadastro");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("erro_cadastro");
    if (texto) {
        divErrosLogin.innerHTML = texto;
    }

    setTimeout(() => {
        sumirMensagemCadastro();
    }, 5000);
}

// CARREGAMENTO (LOADING) LOGIN
function aguardarLogin() {
    var divAguardar = document.getElementById("loading_login");
    divAguardar.style.display = "flex";
    card_erro_login.style.display = "none"
}

// ENCERRAMENTO DO (LOADING) E CARD DE ERROS
function finalizarAguardarLogin(texto) {
    var divAguardar = document.getElementById("loading_login");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("erro_login");
    if (texto) {
        divErrosLogin.innerHTML = texto;
    }
    setTimeout(() => {
        sumirMensagemLogin();
    }, 5000);
}

//ADICIONAR O LIKE EM DETERMINADA MÚSICA
function addLike(id){
    var idMusic = id;
    var idUser = sessionStorage.ID_USUARIO;

    fetch("/atualizar/addLike", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMusicServer: idMusic,
            idUserServer: idUser
        })
    }).then(function (resposta) {

        if (resposta.ok) {
        } else {
            throw ("Houve um erro ao tentar dar like na musica!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

//REMOVER LIKE DE UMA DETERMINADA MÚSICA
function removeLike(id){
    var idMusic = id;
    var idUser = sessionStorage.ID_USUARIO;

    fetch("/atualizar/removeLike", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMusicServer: idMusic,
            idUserServer: idUser
        })
    }).then(function (resposta) {

        if (resposta.ok) {
        } else {
            throw ("Houve um erro ao tentar remover like!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

//FUNÇÃO QUE FAZ ABRIR O LOGIN
function AbrirLogin(local){
    if(validarSessao() == false){
    document.querySelector('.sobreposi').style.animation = 'sobrepor 0.9s ease forwards';

    document.querySelector('.sobreposi').style.display = 'flex'
    document.querySelector('.login').style.display = 'flex'
    }else{
        if(local == "mylikes"){
            window.location = "mylikes.html"
        } else if(local == "playlist"){
            window.location = "myplaylist.html"
        }
    };        
}

//FECHANDO A TELA DE CADASTRO OU DE LOGIN
function Close(podeAbrir){
    document.querySelector('.sobreposi').style.animation = 'fechar 0.9s ease forwards';
    
    setTimeout(() => {
        document.querySelector('.sobreposi').style.display = 'none';
            document.querySelector('.cadastro').style.display = 'none';
            document.querySelector('.login').style.display = 'none'; 
            if(podeAbrir){
                AbrirCadastro();
            }
        }, 900);
}

//FUNÇÃO QUE FAZ ABRIR A TELA DE CADASTRO
function AbrirCadastro(){
    if(validarSessao() == false){
    document.querySelector('.sobreposi').style.animation = 'sobrepor 0.9s ease forwards';

    document.querySelector('.sobreposi').style.display = 'flex'
    document.querySelector('.cadastro').style.display = 'flex'
    }
}

//FUNÇÃO PARA SUMIR A MENSAGEM DE ERRO CADASTRO
function sumirMensagemCadastro() {
    card_erro_cadastro.style.display = "none"
}

//FUNÇÃO PARA SUMIR A MENSAGEM DE ERRO LOGIN
function sumirMensagemLogin() {
    card_erro_login.style.display = "none"
}

function pesquisarMusica(){

    fetch("/atualizar/pesquisarMusica").then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for(var i = 0; i < resposta.length ; i++){
                    arrayPesquisaMusica.push(resposta[i]);
                }

            });
            pesquisarArtista();
        } else {
            throw ("Houve um erro ao tentar puxar dados para pesquisa do banco de dados!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function pesquisarArtista(){

    fetch("/atualizar/pesquisarArtista").then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for(var i = 0; i < resposta.length ; i++){
                    arrayPesquisaArtista.push(resposta[i]);
                }
            });
            pesquisarGenero();
        } else {
            throw ("Houve um erro ao tentar puxar dados para pesquisa do banco de dados!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function pesquisarGenero(){

    fetch("/atualizar/pesquisarGenero").then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for(var i = 0; i < resposta.length ; i++){
                    arrayPesquisaGenero.push(resposta[i]);
                }
            });
        } else {
            throw ("Houve um erro ao tentar puxar dados para pesquisa do banco de dados!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function pesquisar(){
    var digitou = (document.getElementById(`src`).value).toUpperCase();
    var divResultado = document.getElementById(`divResultado`);
    var divPesquisa = document.querySelector(`.bar-src`);
    var contadorMusicas = 0;
    var contadorArtistas = 0;
    var contadorGeneros = 0;

    divPesquisa.style.animation = "barra-src-down .5s linear forwards";

    setTimeout(() => {
        divResultado.style.display = "flex"
    }, 450);

    divResultado.innerHTML = "";

    divResultado.innerHTML += `
    <h3 id="musica-src">Musicas</h3>
    `;

    var musica_src = document.getElementById(`musica-src`);

    for(var i = 0; i< arrayPesquisaMusica.length; i++){
        if((arrayPesquisaMusica[i].nome).toUpperCase().indexOf(digitou , 0) >= 0 && digitou != ""){
            divResultado.innerHTML += `
            <div class="resultados-src">
                <div class="foto-resultado" id="fotoMusica${arrayPesquisaMusica[i].idMusica}"></div>
                <div class="texto-resultado">
                    <h3>${arrayPesquisaMusica[i].nome}&nbsp;</h3>-
                    <h5>&nbsp;Musica</h5>
                </div>
            </div>
            `;
            var foto = document.getElementById(`fotoMusica${arrayPesquisaMusica[i].idMusica}`);
            foto.style.backgroundImage = `url("/assets/picture/${arrayPesquisaMusica[i].caminhoFoto}")`;
            contadorMusicas++;
        }
    }

    if(contadorMusicas == 0){
        musica_src.style.display = "none";
    }

    divResultado.innerHTML += `
    <h3 id="artista-src">Artistas</h3>
    `;

    var artista_src = document.getElementById(`artista-src`);

    for(var i = 0; i< arrayPesquisaArtista.length; i++){
        if((arrayPesquisaArtista[i].nome).toUpperCase().indexOf(digitou , 0) >= 0 && digitou != ""){
            divResultado.innerHTML += `
            <div class="resultados-src">
                <div class="foto-resultado" id="fotoArtista${arrayPesquisaArtista[i].idArtista}"></div>
                <div class="texto-resultado">
                    <h3>${arrayPesquisaArtista[i].nome}&nbsp;</h3>-
                    <h5>&nbsp;Artista</h5>
                </div>
            </div>
            `;
            var foto = document.getElementById(`fotoArtista${arrayPesquisaArtista[i].idArtista}`);
            foto.style.backgroundImage = `url("/assets/picture/${arrayPesquisaArtista[i].caminhoFoto}")`;
            contadorArtistas++;
        }
    }

    if(contadorArtistas == 0){
        artista_src.style.display = "none";
    }

    divResultado.innerHTML += `
    <h3 id="genero-src">Generos</h3>
    `;

    var genero_src = document.getElementById(`genero-src`);

    for(var i = 0; i< arrayPesquisaGenero.length; i++){
        if((arrayPesquisaGenero[i].genero).toUpperCase().indexOf(digitou , 0) >= 0 && digitou != ""){
            divResultado.innerHTML += `
            <div class="resultados-src">
                <div class="foto-resultado" id="fotoGenero${arrayPesquisaGenero[i].genero}"></div>
                <div class="texto-resultado">
                    <h3>${arrayPesquisaGenero[i].genero}&nbsp;</h3>-
                    <h5>&nbsp;Genero</h5>
                </div>
            </div>
            `;
            var foto = document.getElementById(`fotoGenero${arrayPesquisaGenero[i].genero}`);
            foto.style.backgroundImage = `url("/assets/picture/genero.png")`;        
            contadorGeneros++;
        }
    }

    if(contadorGeneros == 0){
        genero_src.style.display = "none";
    }

    if(contadorMusicas == 0 && contadorArtistas == 0 && contadorGeneros == 0){
        divResultado.innerHTML = `
        <h3 style="align-self: center;">Nenhum Resultado Encontrado!</h3>
        `;
    }
}
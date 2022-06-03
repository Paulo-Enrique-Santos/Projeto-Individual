// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null) {
        document.querySelector('.btns').style.display = 'none'
        document.querySelector('.logado').style.display = 'flex'
        name_user.innerHTML = nome;
        return true;
        // finalizarAguardar();
    } else {
        document.querySelector('.btns').style.display = 'flex'
        document.querySelector('.logado').style.display = 'none'
        name_user.innerHTML = nome;
        return false;   
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "index.html";
}

// CARREGAMENTO (LOADING) CADASTRO
function aguardarCadastro() {
    var divAguardar = document.getElementById("loading_cadastro");
    divAguardar.style.display = "flex";
    card_erro_cadastro.style.display = "none"
}

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

    // Enviando o valor da nova input
    fetch("/atualizar/addLike", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            idMusicServer: idMusic,
            idUserServer: idUser
        })
    }).then(function (resposta) {

        if (resposta.ok) {
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

}

//REMOVER LIKE DE UMA DETERMINADA MÚSICA
function removeLike(id){
    var idMusic = id;
    var idUser = sessionStorage.ID_USUARIO;

    // Enviando o valor da nova input
    fetch("/atualizar/removeLike", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            idMusicServer: idMusic,
            idUserServer: idUser
        })
    }).then(function (resposta) {

        if (resposta.ok) {
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

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

//ABRINDO A TELA DE CADASTRO
function AbrirCadastro(){
    if(validarSessao() == false){
    document.querySelector('.sobreposi').style.animation = 'sobrepor 0.9s ease forwards';

    document.querySelector('.sobreposi').style.display = 'flex'
    document.querySelector('.cadastro').style.display = 'flex'
    }
}

//FUNÇÃO PARA SUMIR A MENSAGEM DE ERRO
function sumirMensagemCadastro() {
    card_erro_cadastro.style.display = "none"
}

//FUNÇÃO PARA SUMIR A MENSAGEM DE ERRO
function sumirMensagemLogin() {
    card_erro_login.style.display = "none"
}

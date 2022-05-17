// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
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
    window.location = "../login.html";
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
}

// CARREGAMENTO (LOADING) LOGIN
function aguardarLogin() {
    var divAguardar = document.getElementById("loading_login");
    divAguardar.style.display = "flex";
    card_erro_login.style.display = "none"
}

function finalizarAguardarLogin(texto) {
    var divAguardar = document.getElementById("loading_login");
    //divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("erro_login");
    var cardErro = document.getElementById("card_erro_login");
    if (texto) {
        divAguardar.style.display = 'none'
        cardErro.style.display = 'flex'
        divErrosLogin.innerHTML = texto;
    }
}

//ADICIONAR O LIKE EM DETERMINADA MÚSICA
function addLike(id){

    var idMusic = id;
    var idUser = sessionStorage.ID_USUARIO;

    alert(idUser);

    // Enviando o valor da nova input
    fetch("/avisos/addLike", {
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

        console.log("resposta: ", resposta);

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
    console.log(id)
}

//ABRINDO A TELA DE CADASTRO
function AbrirCadastro(){

    if(validarSessao() == false){
    document.querySelector('.sobreposi').style.animation = 'sobrepor 0.9s ease forwards';

    document.querySelector('.sobreposi').style.display = 'flex'
    document.querySelector('.cadastro').style.display = 'flex'
    }else{
        alert('Ainda não fiz essa página')
    }
}

function AbrirLogin(){

    if(validarSessao() == false){
    document.querySelector('.sobreposi').style.animation = 'sobrepor 0.9s ease forwards';

    document.querySelector('.sobreposi').style.display = 'flex'
    document.querySelector('.login').style.display = 'flex'
    }else{
        alert('Ainda não fiz essa página')
    }
}

//FECHANDO A TELA DE CADASTRO OU DE LOGIN
function Close(){
    document.querySelector('.sobreposi').style.animation = 'fechar 0.9s ease forwards';

    setTimeout(() => {
        document.querySelector('.sobreposi').style.display = 'none';
            document.querySelector('.cadastro').style.display = 'none';
            document.querySelector('.login').style.display = 'none';    
        }, 900);
}

//FUNÇÃO PARA SUMIR A MENSAGEM DE ERRO
function sumirMensagemCadastro() {
    card_erro_cadastro.style.display = "none"
}

//FUNÇÃO PARA SUMIR A MENSAGEM DE ERRO
function sumirMensagemLogin() {
    card_erro_login.style.display = "none"
}

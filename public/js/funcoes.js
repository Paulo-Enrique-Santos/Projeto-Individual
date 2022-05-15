// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var h1LoginUsuario = document.getElementById("name_user");

    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        document.querySelector('.btns').style.display = 'none'
        document.querySelector('.logado').style.display = 'flex'
        name_user.innerHTML = nome;

        // finalizarAguardar();
    } /*else {
        window.location = "../login.html";
    }*/
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../login.html";
}

// carregamento (loading) cadastro
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

// carregamento (loading) cadastro
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
}

// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}


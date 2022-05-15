//FUNCTIONS ##############################################################################################################
//ABRINDO A TELA DE CADASTRO
function AbrirCadastro(){
    document.querySelector('.sobreposi').style.animation = 'sobrepor 0.9s ease forwards';

    document.querySelector('.sobreposi').style.display = 'flex'
    document.querySelector('.cadastro').style.display = 'flex'
}

function AbrirLogin(){
    document.querySelector('.sobreposi').style.animation = 'sobrepor 0.9s ease forwards';

    document.querySelector('.sobreposi').style.display = 'flex'
    document.querySelector('.login').style.display = 'flex'
}

//FECHANDO A TELA DE CADASTRO OU DE LOGIN
function Close(){
    document.querySelector('.sobreposi').style.animation = 'fechar 0.9s ease forwards';

    var interval = setTimeout(() => {
        document.querySelector('.sobreposi').style.display = 'none';
            document.querySelector('.cadastro').style.display = 'none';
            document.querySelector('.login').style.display = 'none';    
        }, 900);
}

//FUNÇÃO PARA ENTRAR NA CONTA
function entrar() {
    aguardarLogin();

    var emailVar = email_login.value;
    var senhaVar = senha_login.value;

    if (emailVar == "" || senhaVar == "") {
        card_erro_login.style.display = "flex"
        erro_login.innerHTML = "Um ou mais campos estão em branco.";
        finalizarAguardarLogin();
        return false;
    }
    else {
        setInterval(sumirMensagemLogin, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    window.location = "music.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

//FUNÇÃO PARA CADASTRAR 
function cadastrar() {
    aguardarCadastro();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome_cadastro.value;
    var emailVar = email_cadastro.value;
    var emailVarC = email_cadastro_c.value;
    var senhaVar = senha_cadastro.value;
    var senhaVarC = senha_cadastro_c.value;

    if (nomeVar == "" || emailVar == "" || senhaVar == "" || senhaVarC == "" || emailVarC == "") {
        card_erro_cadastro.style.display = "flex"
        erro_cadastro.innerHTML = "Um ou mais campos estão em branco.";

        finalizarAguardarCadastro();
        return false;
    }
    else {
        setInterval(sumirMensagemCadastro, 5000)
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            card_erro_cadastro.style.display = "flex";

            erro_cadastro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

            setTimeout(() => {
                window.location = "login.html";
            }, "2000")
            
            limparFormulario();
            finalizarAguardarCadastro();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardarCadastro();
    });

    return false;
}

//FUNÇÃO PARA SUMIR A MENSAGEM DE ERRO
function sumirMensagemCadastro() {
    card_erro_cadastro.style.display = "none"
}

//FUNÇÃO PARA SUMIR A MENSAGEM DE ERRO
function sumirMensagemLogin() {
    card_erro_login.style.display = "none"
}

//FUNÇÃO PARA PEGAR AS MUSICAS DO BANCO DE DADOS
function atualizarGenero() {
    fetch("/avisos/listar").then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                console.log(resposta.length)
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
    fetch("/avisos/listarFoto", {
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
                console.log(resposta.length)
                var feed = document.getElementById(idVar);
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    // criando e manipulando elementos do HTML via JavaScript
                    var fotoArtista = document.createElement("li");
                    fotoArtista.id = i;
                    fotoArtista.style.backgroundImage = `url('./assets/picture/${publicacao.caminhoFoto}')`

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

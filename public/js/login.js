//FUNÇÃO PARA ENTRAR NA CONTA
function entrar() {
    aguardarLogin();

    var emailVar = (email_login.value).toLowerCase();
    var senhaVar = senha_login.value;

    if (emailVar == "" || senhaVar == "") {
        card_erro_login.style.display = "flex"
        finalizarAguardarLogin();
        erro_login.innerHTML = "Um ou mais campos estão em branco.";
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
                sessionStorage.ID_USUARIO = json.idUsuario;

                setTimeout(function () {
                    window.location = "music.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardarLogin(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

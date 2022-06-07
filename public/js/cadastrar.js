//FUNÇÃO PARA CADASTRAR 
function cadastrar() {
    aguardarCadastro();

    var nomeVar = (nome_cadastro.value).toLowerCase();
    var emailVar = (email_cadastro.value).toLowerCase();
    var emailVarC = (email_cadastro_c.value).toLowerCase();
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

    if (emailVar != emailVarC ) {
        card_erro_cadastro.style.display = "flex"
        erro_cadastro.innerHTML = "Os Emails não coincidem.";

        finalizarAguardarCadastro();
        return false;
    }
    else {
        setInterval(sumirMensagemCadastro, 5000)
    }

    if (senhaVar != senhaVarC ) {
        card_erro_cadastro.style.display = "flex"
        erro_cadastro.innerHTML = "As Senhas não coincidem.";

        finalizarAguardarCadastro();
        return false;
    }
    else {
        setInterval(sumirMensagemCadastro, 5000)
    }

    if (emailVarC.indexOf('@',0) == -1 || emailVarC.indexOf('.',0) == -1 || 
        emailVarC.indexOf('.',0) < emailVarC.indexOf('@',0)) {
        card_erro_cadastro.style.display = "flex"
        erro_cadastro.innerHTML = "O Email tem que ser válido.";

        finalizarAguardarCadastro();
        return false;
    }
    else {
        setInterval(sumirMensagemCadastro, 5000)
    }
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            card_erro_cadastro.style.display = "flex";
            erro_cadastro.style.color = 'green'
            erro_cadastro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

            setTimeout(() => {
                Close();
            }, "1000")
            
            setTimeout(() => {
                erro_cadastro.style.color = 'red'
                AbrirLogin();
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


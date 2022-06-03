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


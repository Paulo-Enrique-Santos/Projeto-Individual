//ARAY QUE SALVA AS MÚSICAS
var musica=[{
    titulo: 'Red Eye',
    artista: 'Justin Bieber',
    foto: './assets/picture/slide 1.jpg',
},{
    titulo: 'Maquina do Tempo',
    artista: 'Matue',
    foto: './assets/picture/slide 2.jpg'
}];

//INSERE MUSICAS LOGO QUE A PÁGINA CARREGA 
window.onload = InserirFotos();

//FUNCTIONS ##############################################################################################################

//INSERINDO FOTOS
function InserirFotos(){
    InserindoCards();
    for(var i = 0; i < (musica.length); i ++)
    {
        sertanejo.innerHTML += `<li class="slide${i}"></li>`
        document.querySelector(`.slide${i}`).style.backgroundImage= `url("${musica[i].foto}")`;
        document.querySelector('#sertanejo').style.width = (musica.length * 15) + '%'
        if((musica.length * 15) > 100){
            document.querySelector('#sertanejo').style.width = (musica.length * 15) + '%'
        }else{
            document.querySelector('#sertanejo').style.width = '100%'
        }
    }
}

//INSERINDO CARDS
function InserindoCards(){
    for(var i = 0; i < 2; i ++)
    {
        document.querySelector('#index').innerHTML += `
        <div class="card" id="${i}"></div>
        `
    }
}

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
// INSERINDO SOUNDWAVES
var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#a8a8a8',
    progressColor: '#01a0c8',
    barWidth: '2',
    height: '50',
    hideScrollbar: 'false',
    responsive: 'true'
});

wavesurfer.load('./assets/audio/audio 1.mp3');

//INSERE MUSICAS LOGO QUE A PÁGINA CARREGA 
window.onload = InserirFotos();

//FUNCTIONS ##############################################################################################################

//INSERINDO FOTOS
function InserirFotos(){
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

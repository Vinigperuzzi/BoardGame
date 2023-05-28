let andamento = false;
let tocando = false;
let audio = new Audio ('Assets/audio/audio1.mp3');
let audioNumber = 1;

function comecaJogo(){
    if (!andamento){
        console.log('Jogo iniciado');
        andamento = true;
    } else {
        console.log('Jogo já está em andamento');
    }
}

function terminaJogo(){
    if (andamento){
        console.log('Jogo terminado');
        andamento = false;
    } else {
        console.log('O jogo não está executando');
    }
}

function playAudio(){
    if(!tocando){
        console.log('era pra tocar');
        audio = new Audio(`Assets/audio/audio${audioNumber}.mp3`);
        audio.play()
        tocando = true;
        audioNumber++;
    } else {
        console.log('era pra parar');
        audio.pause();
        audio.currentTime = 0;
        tocando = false;
    }
    audioNumber = (audioNumber%2) + 1;
}

//-------------Changing board colors from forms----------------

const form1 = document.querySelector("#color1");
const form2 = document.querySelector("#color2");

form1.addEventListener('submit', corClaras);
form2.addEventListener('submit', corEscuras);

function corClaras (evento) {
    const cor = form1.querySelector('#color-claras');
    evento.preventDefault();
    var newColor = document.querySelector(':root');
    newColor.style.setProperty('--whiteSquares', `${cor.value}`);
}

function corEscuras (evento) {
    const cor = form2.querySelector('#color-escuras');
    evento.preventDefault();
    var newColor = document.querySelector(':root');
    newColor.style.setProperty('--blackSquares', `${cor.value}`);
}

/*Lógica antiga da troca de cores:
let casa = document.querySelector(`#square-${i}`);
            console.log(cor.value);
            casa.style.background = `${cor.value}`;
*/
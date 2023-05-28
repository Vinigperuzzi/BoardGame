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
const form3 = document.querySelector("#mainInput");

form1.addEventListener('submit', corClaras);
form2.addEventListener('submit', corEscuras);
form3.addEventListener('submit', gameInput);


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

function gameInput (evento) {
    const square = form3.querySelector('#square-name');
    evento.preventDefault();
    console.log(square.value);
    //This line is to clean the last unput
    form3.innerHTML = '<input type="text" name="square-name" id="square-name" placeholder="a4, b3, c2..."><button type="submit" id="OK">OK</button>'
}

/*Lógica antiga da troca de cores:
let casa = document.querySelector(`#square-${i}`);
            console.log(cor.value);
            casa.style.background = `${cor.value}`;
*/

let casaI = document.querySelector("#square-1 p");
casaI.innerHTML = "1";
casaI.style.color = '#c4c10c';

casaI = document.querySelector("#square-2 p");
casaI.innerHTML = "V";
casaI.style.color = '#00ff00';

casaI = document.querySelector("#square-3 p");
casaI.innerHTML = "X";
casaI.style.color = '#ff0000';
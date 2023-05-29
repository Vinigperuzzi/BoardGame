let andamento = false, tocando = false, audioNumber = 1;
let audio = new Audio ('Assets/audio/audio1.mp3');
let errorAudio = new Audio ('Assets/audio/Error.mp3');
let successAudio = new Audio ('Assets/audio/Success.mp3');
let victoryAudio = new Audio ('Assets/audio/victory.mp3');
let failAudio = new Audio ('Assets/audio/fail.mp3');
let perfectAudio = new Audio ('Assets/audio/cheering.mp3');

let order = [];
for (let i = 1; i<=64; i++){
    order.push(i);
}

function comecaJogo(){
    if (!andamento){
        andamento = true;
        startGame();
    } else {
        alert('Jogo já está em andamento...');
    }
}

function terminaJogo(){
    if (andamento){
        andamento = false;
        fimDeJogo();
    } else {
        alert('O jogo não está em execução...');
    }
}

let icon = document.querySelector('#icon');
function playAudio(){
    if(!tocando){
        audio = new Audio(`Assets/audio/audio${audioNumber}.mp3`);
        audio.play()
        tocando = true;
        audioNumber++;
        icon.style.boxShadow = "5px 5px 4px 4px rgba(1,2,111,11)";
    } else {
        audio.pause();
        audio.currentTime = 0;
        tocando = false;
        icon.style.boxShadow = "5px 5px 4px 4px rgba(255,2,111,11)";
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
    updateGame(square.value);
    //This line is to clean the last unput
    form3.innerHTML = '<input type="text" name="square-name" id="square-name" placeholder="a4, b3, c2..."><button type="submit" id="OK">OK</button>'
}


/*Lógica antiga da troca de cores:
let casa = document.querySelector(`#square-${i}`);
            console.log(cor.value);
            casa.style.background = `${cor.value}`;
*/



//------------------Funções auxiliares do jogo-----------//


function numberToLetter(number){
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return letters[number-1];
}
function numberToLetterCaps(number){
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    return letters[number-1];
}

function createSquares(index, status, rank, row){
    let square = `${numberToLetter(rank)}${row}`;
    let squareCaps = `${numberToLetterCaps(rank)}${row}`;
    return {
        index,
        status,
        square,
        squareCaps
    };
}



function shuffleArray(array){
    let aux;
    for(let i = 0; i<array.length; i++){
        let newPos = Math.random();
        newPos *= 64;
        newPos = parseInt(newPos, 10);
        aux = array[i];
        array[i] = array[newPos];
        array[newPos] = aux;
    }
}


//---------------------------------------Início da lógica do jogo------------------------------//

let yeallowColor = '#bfb304', greenColor = '#00ff00', redColor = '#ff0000';
let pace = 0, step = 0, hit = 0, miss = 0;
let startClock, endClock;


const squares = [];//casas com index, estado e nome das casas
squares.push(64);
for(let i = 0; i<8; i++){
    for(let j = 1; j <= 8; j++){
        squares.push(createSquares((i*8)+j, 0, j, i+1));
    }
}


function startGame(){
    startClock = Date.now();
    shuffleArray(order);
    step++;
    for(let i = 0; i<64; i++){
        if(order[pace] == squares[i].index){
            let casa = document.querySelector(`#square-${squares[i].index} p`);
            casa.innerHTML = `${step}`;
            casa.style.color = yeallowColor;
        }
    }
}


function updateGame(formValue){
    if(!andamento){
        alert("O jogo deve estar em andamento para você poder dizer uma casa!");
        return;
    }

    if (squares[order[pace]].square == formValue || squares[order[pace]].squareCaps == formValue){
        let casa = document.querySelector(`#square-${squares[order[pace]].index} p`);
        casa.innerHTML = `V`;
        casa.style.color = greenColor;
        successAudio.play();
        hit++;
    } else {
        let casa = document.querySelector(`#square-${squares[order[pace]].index} p`);
        casa.innerHTML = `X`;
        casa.style.color = redColor;
        errorAudio.play();
        miss++;
    }
    step++;
    pace++;

    if (pace >= 64){
        if(hit == 64){
            perfectAudio.play();
            alert('Perfeito!!! Você é demais!!');
        } else if (hit >= miss){
            victoryAudio.play();
            alert('Parabéns!!!');
        } else{
            failAudio.play();
            alert("Fim de jogo.");
        }
        andamento = false;
        fimDeJogo();
        return;
    }

    for(let i = 0; i<=64; i++){
        if(order[pace] == squares[i].index){
            let casa = document.querySelector(`#square-${squares[i].index} p`);
            casa.innerHTML = `${step}`;
            casa.style.color = yeallowColor;
        }
    }
}


function fimDeJogo(){
    endClock = Date.now();
    let timePlayed = endClock - startClock;
    let minutes = Math.floor((timePlayed/1000/60) << 0);
    let seconds = Math.floor((timePlayed/1000) % 60);
    for(let i = 0; i<8; i++){
        for(let j = 1; j <= 8; j++){
            squares.push(createSquares((i*8)+j, 0, j, i+1));
            let casa = document.querySelector(`#square-${(i*8) + j} p`);
            casa.innerHTML = '';
        }
    }
    alert(`Seu tempo de jogo foi: ${minutes} Minutes, ${seconds} Seconds.\nDos ${pace} lances você acertou ${hit} e errou ${miss}.`);
    step = 0; hit = 0; miss = 0; pace = 0;
}


function warning(){
    alert('Desculpe! A página em questão ainda não está implementada, por favor, seja paciente!');
}
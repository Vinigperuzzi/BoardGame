let andamento = false, tocando = false, audioNumber = 1;
let audio = new Audio ('Assets/audio/audio1.mp3');
let testecor = '#bfb304'

let order = [];
for (let i = 1; i<=64; i++){
    order.push(i);
}


const squares = [];//casas com index, estado e nome das casas
for(let i = 0; i<8; i++){
    for(let j = 1; j <= 8; j++){
        squares.push(createSquares((i*8)+j, 0, j, i+1));
        // let casa = document.querySelector(`#square-${(i*8) + j}`);
        // casa.innerHTML = `${squares[(i*8) + j - 1].square}`
        // casa.style.color = testecor;
    }
}

function comecaJogo(){
    if (!andamento){
        console.log('Jogo iniciado');
        andamento = true;
        mainGame();
    } else {
        console.log('Jogo já está em andamento');
        alert('Jogo já está em andamento');
    }
}

function terminaJogo(){
    if (andamento){
        console.log('Jogo terminado');
        andamento = false;
        fimDeJogo();
    } else {
        console.log('O jogo não está executando');
        alert('O jogo não está executando');
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



//---------------------------Testes diversos com cores------------//

let casaI = document.querySelector("#square-1 p");
casaI.innerHTML = "1";
casaI.style.color = testecor;

casaI = document.querySelector("#square-2 p");
casaI.innerHTML = "2";
casaI.style.color = testecor;

casaI = document.querySelector("#square-3 p");
casaI.innerHTML = "V";
casaI.style.color = '#00ff00';

casaI = document.querySelector("#square-4 p");
casaI.innerHTML = "V";
casaI.style.color = '#00ff00';

casaI = document.querySelector("#square-5 p");
casaI.innerHTML = "X";
casaI.style.color = '#ff0000';

casaI = document.querySelector("#square-6 p");
casaI.innerHTML = "X";
casaI.style.color = '#ff0000';


//------------------Funções auxiliares do jogo-----------//


function numberToLetter(number){
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return letters[number-1];
}

function createSquares(index, status, rank, row){
    let square = `${numberToLetter(rank)}${row}`;
    return {
        index,
        status,
        square
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

function mainGame(){
    let gameOrder = [], palpite = 1;
    gameOrder = order.concat(gameOrder);
    shuffleArray(gameOrder);
    console.log(gameOrder);
    for(let i = 0; i<64; i++){
        if(gameOrder[0] == squares[i].index){
            let casa = document.querySelector(`#square-${squares[i].index} p`);
            casa.innerHTML = `${palpite}`
            casa.style.color = testecor;
        }
    }
}

function fimDeJogo(){
    for(let i = 0; i<8; i++){
        for(let j = 1; j <= 8; j++){
            squares.push(createSquares((i*8)+j, 0, j, i+1));
            let casa = document.querySelector(`#square-${(i*8) + j} p`);
            casa.innerHTML = '';
        }
    }
}

/*TODO: iniciar o mainGame, mostrando o primeiro palpite, depois
* para cada submissão avançar o jogo.
* Talvez ir na pegada do C#, criar uma função para iniciar(start)
* e outra para atualizar(update).
* O botão que encerra o jogo reseta tudo, tira os p's com ="";
* mostra os resultados quantidade de jogadas, erros e acertos e tempo
* e reseta os valores
*/
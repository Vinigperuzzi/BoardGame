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
        audio = new Audio(`Assets/audio/audio${audioNumber}.mp3`);
        audio.play()
        tocando = true;
        audioNumber++;
    } else {
        audio.pause();
        audio.currentTime = 0;
        tocando = false;
    }
    audioNumber = (audioNumber%2) + 1;
}

function main(){
    
}
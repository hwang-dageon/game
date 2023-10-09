'use strict';
const carrotSound=new Audio('sound/carrot_pull.mp3');
const bugSound=new Audio('sound/bug_pull.mp3');
const hitSound=new Audio('sound/hit.mp3');
const dieSound=new Audio('sound/die.mp3');
const getCarrotSound=new Audio('sound/get_carrot.mp3');
const alertSound=new Audio('sound/alert.wav');
const winSound=new Audio('sound/game_win.mp3');
const bgSound=new Audio('sound/bg.mp3');
const clockSound=new Audio('sound/clock.wav');

export function playCarrot(){
    playSound(carrotSound);
}
export function playBug(){
    playSound(bugSound);
}
export function playHit(){
    playSound(hitSound);
}
export function playDie(){
    playSound(dieSound);
}
export function playAlert(){
    playSound(alertSound);
}
export function playWin(){
    playSound(winSound);
}
export function playbg(){
    playSound(bgSound);
}
export function playClock(){
    playSound(clockSound);
}
export function stopbg(){
    stopSound(bgSound);
}
export function stopClock(){
    stopSound(clockSound);
}
export function playGetCarrot(){
    playSound(getCarrotSound);
}

function playSound(sound){
    sound.currentTime=0;
    sound.play();   
}
function stopSound(sound){
    sound.pause();
}

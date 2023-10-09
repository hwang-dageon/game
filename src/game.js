'use strict';
import * as sound from './sound.js';
import {Field,ItemType} from './field.js';

export const Reason=Object.freeze({
    cancel:'cancel',
    next:'next',
    win:'win',
    lose:'lose'   
})
//Builder Pattern
export class GameBuilder{
    withGameDuration(duration){
        this.gameDuration=duration;
        return this;
    }
    withCarrotCount(num){
        this.carrotCount=num;
        return this;
    }
    withBugCount(num){
        this.bugCount=num;
        return this;
    }
    withRabbitCount(num){
        this.rabbitCount=num;
        return this;
    }
    withBossCount(num){
        this.bossCount=num;
        return this;
    }
    build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount,
            this.rabbitCount,
            this.bossCount
        )
    }
}

class Game{
    constructor(gameDuration,carrotCount,bugCount,rabbitCount,bossCount){
        this.carrotCount=carrotCount;
        this.bugCount=bugCount;
        this.rabbitCount=rabbitCount;
        this.bossCount=bossCount;
        this.gameDuration=gameDuration;
        this.started=false;
        this.score=0;
        this.level=1;
        this.timer=undefined;
        this.clockSetTimeout=undefined;
        this.gameBtn=document.querySelector('.game__button');
        this.gameTimerBox=document.querySelector('.game__timer-box');
        this.clock=document.querySelector('.clock');
        this.gameTimer=document.querySelector('.game__timer');
        this.gameScore=document.querySelector('.game__score');
        this.gameLevel=document.querySelector('.level');
        this.gameBtn.addEventListener('click',()=>{
            if(this.started){
                this.stop(Reason.cancel);
            }else{
                this.gameField.hideReadyScreen();
                this.start();
            }
        });
        this.gameField=new Field(this.carrotCount,this.bugCount,this.rabbitCount,this.bossCount);
        this.gameField.setClickListener(this.onItemClick);
    }
    setGameStopListener(onGameStop){
        this.onGameStop=onGameStop;
    }
    start(){
        this.started=true;
        this.score=0;
        sound.playbg();
        this.initGame(this.level);
        this.showStopBtn();
        this.showTimerAndScore();
        this.startGameTimer();
        this.gameField.notClickable('auto');
        this.showLevel();
    }
    stop(reason){
        this.started=false;
        sound.stopbg();
        this.hideGameBtn();
        this.stopGameTimer();
        this.onGameStop&&this.onGameStop(reason);
        this.gameField.notClickable('none');
    }
    onItemClick=(success,countTarget)=>{
        if(!this.started){
            return;
        }
        if(success){
            this.score++;
            this.updateScoreBoard(countTarget);
            switch (this.level) {
                case 1:
                case 2:
                    this.calculateForLevelUp(this.carrotCount);
                    break;
                case 3:
                    this.calculateForLevelUp(this.bossCount);
                    break;
                default:
                    Error('unknown');
                    break;
            }
        }else{
            this.stop(Reason.lose);
        }
    }
    calculateForLevelUp(countedItem){
        if(this.score===countedItem){
                if(this.level!==3){
                    this.stop(Reason.next);
                    this.levelUp();
                    return;
                }
                this.stop(Reason.win);
                this.initializeLevel();
        }
    }
    startGameTimer(){
        let remainingTimeSec=this.gameDuration;
        if(this.level===3){
            remainingTimeSec*=2;
        }
        this.clockRing(remainingTimeSec);
        this.updateTimerText(remainingTimeSec);
        this.timer=setInterval(() => {
            if(remainingTimeSec<=0){
                clearInterval(this.timer);
                this.stop(this.carrotCount===this.score?Reason.win:Reason.lose);
                return;
            }else{
                this.updateTimerText(--remainingTimeSec);
            }
        }, 1000);
    }
    stopGameTimer(){
        clearInterval(this.timer);
        this.stopClockRing();
        sound.stopClock();
    }
    showLevel(){
        this.gameLevel.textContent=this.level;
    }
    levelUp(){
        this.level++;
    }
    initializeLevel(){
        this.level=1;
    }
    updateTimerText(time){
        let minutes=Math.floor(time/60);
        let seconds=time%60;
        this.gameTimer.textContent=`${minutes}:${seconds}`;
    }
    updateScoreBoard(countTarget){
        this.gameScore.textContent=countTarget-this.score;
    }

    showTimerAndScore(){
        this.gameTimerBox.style.visibility='visible';
        this.gameScore.style.visibility='visible';
    }
    showStopBtn(){
        const icon=this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility='visible';
    }
    hideGameBtn(){
        this.gameBtn.style.visibility='hidden';
    }

    initGame(level){
        this.score=0;
        if(level===3){
            this.gameScore.textContent=this.bossCount;
        }else{
            this.gameScore.textContent=this.carrotCount;
        }
        this.gameField.init(level);
    }
    clockRing(time){
        let almostTimeToFinish=time*0.7*1000;
        this.clock.className='clock ring';
        this.clockSetTimeout=setTimeout(() => {
            sound.playClock();
            this.clock.className='clock ring-fast';
            this.clock.setAttribute('src','img/clock-ring.png');
        }, almostTimeToFinish);
    } 
    stopClockRing(){
        clearTimeout(this.clockSetTimeout);
        this.clock.className='clock';
        this.clock.setAttribute('src','img/clock.png');
    }
}
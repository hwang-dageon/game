'use strict';
import PopUp from './popup.js';
import {GameBuilder,Reason} from './game.js';
import * as sound from './sound.js';
const gameFinishBanner=new PopUp();
const game=new GameBuilder()
    .withGameDuration(10)
    .withCarrotCount(10)
    .withBugCount(7)
    .withRabbitCount(5)
    .withBossCount(3)
    .build();
game.setGameStopListener((reason)=>{
    let message;
    let subMessage;
    let icon;
    switch (reason) {
        case Reason.cancel:
            message='Replay❓';
            subMessage='Click this button if you want to replay it!';
            sound.playAlert();
            break;
        case Reason.next:
            message='SUCCESS❗';
            subMessage="Let's go to the next round!";
            sound.playWin();
            icon='<i class="fas fa-arrow-right"></i>'
            break;
        case Reason.win:
            message='YOU WON🎉';
            subMessage='Click this button if you want to go back to Round 1!';
            sound.playWin();
            break;
        case Reason.lose:
            message='YOU LOST💥';
            subMessage='Do you want to try again?'
            sound.playBug();
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message, subMessage,icon);
});

gameFinishBanner.setClickListener(()=>{
    game.start();
});

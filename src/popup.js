'use strict';
export default class Popup{
    constructor(){
        this.popUp=document.querySelector('.pop-up');
        this.popUpText=document.querySelector('.pop-up__message');
        this.popUpSubText=document.querySelector('.pop-up__sub-message');
        this.popUpRefresh=document.querySelector('.pop-up__refresh');
        this.popUpRefresh.addEventListener('click',()=>{
            this.onClick&&this.onClick();
            this.hide();
        });
    }
    setClickListener(onClick){
        this.onClick=onClick;
    }
    showWithText(text, subText,icon='<i class="fas fa-redo"></i>'){
        this.popUpText.textContent=text;
        this.popUpSubText.textContent=subText;
        this.popUp.classList.remove('pop-up--hide');
        this.popUpRefresh.innerHTML=icon;
    }
    hide(){
        this.popUp.classList.add('pop-up--hide');
    }
}
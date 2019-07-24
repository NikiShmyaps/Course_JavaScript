window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    // Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining , hours, minutes, seconds};
        }
        function updateClock(){
            let timer = getTimeRemaining();

            if(timer.timeRemaining < 0){
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }else{
                if(timer.hours.toString().length < 2){
                    timerHours.textContent = '0' + timer.hours;
                }else{
                    timerHours.textContent = timer.hours;
                }
                if(timer.minutes.toString().length < 2){
                    timerMinutes.textContent = '0' + timer.minutes;
                }else{
                    timerMinutes.textContent = timer.minutes;
                }
                if(timer.seconds.toString().length < 2){
                    timerSeconds.textContent = '0' + timer.seconds;
                }else{
                    timerSeconds.textContent = timer.seconds;
                }
                if(timer.timeRemaining > 0){
                    setInterval(() =>{
                        updateClock();
                    }, 1000);
                }
            }
        }
        updateClock();
    }
    countTimer('21 july 2019');

    // menu 
    const toggleMenu = () =>{
        const btnMenu = document.querySelector('.menu'), 
            menu = document.querySelector('menu');
        
        const handlerMenu = () => { 
            menu.classList.toggle('active-menu'); 
        }; 

        btnMenu.addEventListener('click', () => {
            handlerMenu();
        });

        menu.addEventListener('click', (event) => {
            let target = event.target;
            
            if(target.classList.contains('close-btn')){
                handlerMenu();
                return;
            }else if(target.closest('ul>li')){
                handlerMenu();
                return;
            }else if(target.classList.contains('active-menu')){
                return;
            }else{
                handlerMenu();
                return;
            }

            // if(!target){
            //     handlerMenu();
            // }
        });
    }; 
    toggleMenu(); 

    // popup 
    const togglePopUp = () => { 
        const popup = document.querySelector('.popup'), 
            popupBtn = document.querySelectorAll('.popup-btn'), 
            popupContent = document.querySelector('.popup-content');

        popupBtn.forEach((elem) => { 
            elem.addEventListener('click', () => { 
                let clientWidth = document.documentElement.clientWidth;
                if(clientWidth > 768){
                    popup.style.display = 'block';
                    
                    let statrAnimate = Date.now(), //Время начала
                        timerAnimate = setInterval(function(){
                            let timePassed = Date.now() - statrAnimate; // Пройденное время
                            if(timePassed >= 1000){
                                clearInterval(timerAnimate);
                                return;
                            } 
                            playAnimate(timePassed);
                        }, 10);
                    const playAnimate = (timePassed) => {
                        popupContent.style.top = timePassed / 15 + 'px';

                    };
                }else{
                    popup.style.display = 'block';
                }

                }); 
        }); 

        popup.addEventListener('click', (event) =>{
            let target = event.target;
            // contains проверка на наличие класса, вернет false || true
            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            }else{
                // closest проверка элемента на класс, если нет то поднимается выше
                target = target.closest('.popup-content');

            if(!target){
                popup.style.display = 'none';
            }
            }

            

        });
    };   
    togglePopUp();

    // Табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                }else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if(target){
                tab.forEach((item, i) => {
                    if(item === target){
                        toggleTabContent(i);
                    }
                });
            }
            
        });
    };
    tabs();
});
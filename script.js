'use strict';

// Ver 2.1 commit: Logunovich Denis (logunovich@gmail.com)

const btnStart = document.querySelector('.form__button-start'),
      btnFinish = document.querySelector('.form__button-finish'), 
      hoursToday = document.querySelector('#hours-today'),
      minutesToday = document.querySelector('#minutes-today'),
      secondsToday = document.querySelector('#seconds-today'),
      hoursAll = document.querySelector('#hours-all'),
      minutesAll = document.querySelector('#minutes-all'),
      films = document.querySelector('#films');

let myTime,
    learningTime,
    oldTime = +localStorage.getItem('oldTime') || 0;

    if (!learningTime) {
        learningTime = localStorage.getItem('today')
    }

if (localStorage.getItem('pause') == 'true') {
    btnStart.textContent = 'Start';
} else {
    btnStart.textContent = 'Stop';
    timer();
}

updTodayTime(+localStorage.getItem('today'));
updAllTime(+localStorage.getItem('allTime'));

function updAllTime (sec) {
    let showTime = {    
        minutes: Math.floor(sec/60)%60,
        hours: Math.floor(sec/3600)
    };
    if (showTime.minutes < 10) {
    showTime.minutes = `0${showTime.minutes}`
    }
    
    if (showTime.hours < 10) {
    showTime.hours = `0${showTime.hours}`
    }
    
    hoursAll.textContent = `${showTime.hours}h`;
    minutesAll.textContent = `${showTime.minutes}m`;

    const countFilms = Math.floor(+localStorage.getItem('allTime') / 8520);

    films.textContent = countFilms;
}

function updTodayTime (sec) {
    console.log()
    let showTime = {
        seconds: sec%60,
        minutes: Math.floor(sec/60)%60,
        hours: Math.floor(sec/3600)
    };
    if (showTime.minutes < 10) {
    showTime.minutes = `0${showTime.minutes}`
    }
    
    if (showTime.seconds < 10) {
    showTime.seconds = `0${showTime.seconds}`
    }
    
    if (showTime.hours < 10) {
    showTime.hours = `0${showTime.hours}`
    }
    
    hoursToday.textContent = `${showTime.hours}:`;
    minutesToday.textContent = `${showTime.minutes}:`;
    secondsToday.textContent = `${showTime.seconds}`;
}

function timer (curTime = +localStorage.getItem('dataNow') || Date.now()) {
    myTime = setInterval(() => {
        learningTime = Math.floor((Date.now() - curTime) / 1000) + oldTime;
        localStorage.setItem('today', learningTime);
        updTodayTime(learningTime);


        console.log('oldTime - ' + oldTime);
        console.log('curTime - ' + curTime);
        console.log('learningTime - ' + learningTime);
    }, 1000);
}

    btnStart.addEventListener('click', (e) => {
        e.preventDefault(); 
        if (localStorage.getItem('pause') == 'true') {
            timer(Date.now());
            localStorage.setItem('dataNow', Date.now())
            localStorage.setItem('pause', false);
            btnStart.textContent = 'Stop';
            oldTime = +localStorage.getItem('oldTime');
        } else {
            localStorage.setItem('pause', true);
            btnStart.textContent = 'Start';
            localStorage.setItem('oldTime', learningTime);
            oldTime = +localStorage.getItem('oldTime');
            clearInterval(myTime);
        }  
});

btnFinish.addEventListener('click', (e) => {
    e.preventDefault();
    clearInterval(myTime);
    btnStart.textContent = 'Start';
    let finalTime = +localStorage.getItem('allTime') + +localStorage.getItem('today');
    localStorage.setItem('pause', true);
    localStorage.setItem('allTime', finalTime);
    localStorage.setItem('today', 0);
    localStorage.setItem('oldTime', 0);
    oldTime = 0;
    learningTime = 0;
    
    updTodayTime(+localStorage.getItem('today'));
    updAllTime(+localStorage.getItem('allTime'));
});


// localStorage.setItem('allTime', 561600); // записываем какой-то ключ

// localStorage.getItem('number'); // получаем какой-то ключ

// localStorage.removeItem('allSeconds'); // удаляем какой-то ключ

// localStorage.clear(); // полностью очищаем ключи в LocalStorage
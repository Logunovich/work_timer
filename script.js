'use strict';

// Ver 1.1 commit: Logunovich Denis (logunovich@gmail.com)

const btnStart = document.querySelector('.form__button-start'),
      btnPause = document.querySelector('.form__button-pause'),
      btnFinish = document.querySelector('.form__button-finish'), 
      hoursToday = document.querySelector('#hours-today'),
      minutesToday = document.querySelector('#minutes-today'),
      secondsToday = document.querySelector('#seconds-today'),
      hoursAll = document.querySelector('#hours-all'),
      minutesAll = document.querySelector('#minutes-all'),
      films = document.querySelector('#films');

let myTime,
    isPause = !localStorage.getItem('pause');
    console.log(localStorage.getItem('pause'))

if (localStorage.getItem('pause') == 'true') {
    btnStart.textContent = 'Start';
} else {
    btnStart.textContent = 'Stop';
    timer();
}

// btnPause.style.cssText = 'background-color: #b3eac0';
updTodayTime(+localStorage.getItem('allSeconds'));
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

function timer () {
    myTime = setInterval(() => {
        localStorage.setItem('allSeconds', +(localStorage.getItem('allSeconds')) + 1);
        updTodayTime(+localStorage.getItem('allSeconds'));
    }, 1000);
}

    btnStart.addEventListener('click', (e) => {
        e.preventDefault(); 
        if (localStorage.getItem('pause') == 'true') {
            timer();
            btnStart.textContent = 'Stop';
            localStorage.setItem('pause', false);
        } else {
            localStorage.setItem('pause', true);
            btnStart.textContent = 'Start';
            clearInterval(myTime);
        }  





            // btnStart.style.cssText = 'background-color: #b3eac0';
        // btnPause.style.cssText = '';
});

//     btnPause.addEventListener('click', (e) => {
//         e.preventDefault(); 
//         btnStart.style.cssText = '';
//         btnPause.style.cssText = 'background-color: #b3eac0';
//         if (!isPause) {
//             clearInterval(myTime);
//             isPause = true;
//     }
// });

btnFinish.addEventListener('click', (e) => {
    e.preventDefault();
    clearInterval(myTime);
    localStorage.setItem('pause', true);
    btnStart.textContent = 'Start';
    // btnStart.style.cssText = '';
    // btnPause.style.cssText = 'background-color: #b3eac0';

    let finalTime = +localStorage.getItem('allTime') + +localStorage.getItem('allSeconds');

    localStorage.setItem('allTime', finalTime);
    localStorage.setItem('allSeconds', 0);
    
    updTodayTime(+localStorage.getItem('allSeconds'));
    updAllTime(+localStorage.getItem('allTime'));
})


// localStorage.setItem('allTime', 269800); // записываем какой-то ключ

// localStorage.getItem('number'); // получаем какой-то ключ

// localStorage.removeItem('number'); // удаляем какой-то ключ

// localStorage.clear(); // полностью очищаем ключи в LocalStorage
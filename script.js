'use strict';

// Ver 1.6 commit: Logunovich Denis (logunovich@gmail.com)

const btnStart = document.querySelector('.form__button-start'),
      btnPause = document.querySelector('.form__button-pause'),
      hoursToday = document.querySelector('#hours-today'),
      minutesToday = document.querySelector('#minutes-today'),
      secondsToday = document.querySelector('#seconds-today'),
      hoursAll = document.querySelector('#hours-all'),
      minutesAll = document.querySelector('#minutes-all');

let myTime;
let seconds;
let oldTime = 0;
let newTime;
let time;
let first = true;
let isPause = true;

hoursToday.textContent = `00:`;
minutesToday.textContent = `00:`;
secondsToday.textContent = `00`;
hoursAll.textContent = `00h`;
minutesAll.textContent = `00m`;

function timer (time) {
    myTime = setInterval(() => {
        newTime = (new Date).getTime();
        seconds = (Math.round((newTime - time)/1000)) + oldTime;

        let showTime = {
            seconds: seconds%60,
            minutes: Math.floor(seconds/60)%60,
            hours: Math.floor(seconds/3600)
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
        // mSecondsToday.textContent = `${showTime.mSeconds}:`;
        

    }, 1000);
}

    btnStart.addEventListener('click', (e) => {
    e.preventDefault(); 
    time = (new Date).getTime();    
    if (isPause) {
    isPause = false;
    timer(time);
    }  
});

    btnPause.addEventListener('click', (e) => {
    e.preventDefault(); 
    if (!isPause) {
        clearInterval(myTime);
        isPause = true;
        oldTime = seconds;
    }

});


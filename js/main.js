window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  let tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');
  
  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function(event) {
    let target = event.target;

    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
        }
      }
    }
  })

  // Timer

  let deadline = '2020-04-10';
  
  function getTimerRemaining(endtime) {
    let t = Date.parse(deadline) - Date.parse(new Date()),
        seconds = Math.floor(t/1000 % 60),
        minutes = Math.floor(t/1000/60 % 60),
        hours = Math.floor(t/1000/60/60);
    
    return {
      'total': t,
      'seconds': seconds,
      'minutes': minutes,
      'hours': hours
    };

  }

  setClock('timer', deadline);

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        updateTimer = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimerRemaining(endtime);

      if (t.total <= 0) {
        clearInterval(updateTimer);

        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      } else {
        if (t.hours < 10) {
          hours.textContent = '0' + t.hours;
        } else {
          hours.textContent = t.hours;
        }
        if (t.minutes < 10) {
          minutes.textContent = '0' + t.minutes;
        } else {
          minutes.textContent = t.minutes;
        }
        if (t.seconds < 10) {
          seconds.textContent = '0' + t.seconds;
        } else {
          seconds.textContent = t.seconds;
        }
      }

    }
  }

  // Modal

  let btn = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');

  function outputModal(btn, overlay, close) {

    if (!btn.length) {
      btn.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
      });
    
      close.addEventListener('click', function() {
        overlay.style.display = 'none';
        btn.classList.remove('more-splash');
        document.body.style.overflow = '';
      });
    } else {
      let info = document.querySelector('.info');
      let b;

      info.addEventListener('click', function(e) {
        let target = e.target;
        console.log(target);
        if (target && target.classList.contains('description-btn')) {
          for (let i = 0; i < btn.length; i++) {
            if (target == btn[i]) {
              overlay.style.display = 'block';
              btn[i].classList.add('more-splash');
              document.body.style.overflow = 'hidden';

              b = btn[i];
              break;
            }
          }
        }
      });

      close.addEventListener('click', function() {
        overlay.style.display = 'none';
        b.classList.remove('more-splash');
        document.body.style.overflow = '';
      });
    }
  }

  outputModal(btn, overlay, close);

  let btnDescription = document.querySelectorAll('.description-btn');

  outputModal(btnDescription, overlay, close);

  // Form

  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с Вами свяжемся!',
    failute: 'Что-то пошло не так...'
  };

  let form = document.querySelector('.main-form');

  function sendForm(form) {
    let input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      form.appendChild(statusMessage);

      let request = new XMLHttpRequest();

      request.open('POST', 'server.php');
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      
      let formData = new FormData(form);

      let obj = {};
      formData.forEach(function(value, key) {
        obj[key] = value;
      });

      let json = JSON.stringify(obj);

      request.send(json);

      request.addEventListener('readystatechange', function() {
        if (request.readyState < 4) {
          statusMessage.innerHTML = message.loading;
        } else if (request.readyState == 4 && request.status == 200) {
          statusMessage.innerHTML = message.success;
        } else {
          statusMessage.innerHTML = message.failute;
        }
      });

      for (let i = 0; i < input.length; i++) {
        input[i].value = '';
      }

    });
  }

  sendForm(form);

  let formContact = document.querySelector('#form');

  sendForm(formContact);

  
});
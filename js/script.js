window.addEventListener("DOMContentLoaded", () => {
  'use strict';
  let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

  let hideTabContent = (a) => {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }
  hideTabContent(1);

  let showTabContent = (b) => {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.add('show');
      tabContent[b].classList.remove('hide');
    }
  }
  info.addEventListener('click', (event) => {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });
  // TIMER
  let deadline = '2019-04-01';

  function getTimeRemaning (endtime){
    let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)));
    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

    function setClock(id, endtime){
    let timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaning(endtime);
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
      if (t.total < 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }

  };
  setClock('timer', deadline);
 
  //MODAL 
  let more = document.querySelector('.more'),
    click = document.querySelector('#about'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');

  function showModal(a) {
    overlay.style.display = 'block';
    a.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  }

  click.addEventListener('click', (event) => {
    if (event.target && event.target.matches('.description-btn') || event.target == more) {
      showModal(event.target);
    }
  });

  close.addEventListener('click',  () => {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });

  //  FORM


 let message = {
    loading: ' Загрузка...',
    success: ' Спасибо! Скоро мы с вами свяжемся!',
    failure: ' Что-то пошло не так'
  };

  let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input')[0],
    statusMessage = document.createElement('div');
  statusMessage.classList.add('status');
  input.onkeyup = function () {
    this.value = this.value.replace(/[^(\d)|(,)?+]/g, "");
  };

  let formContact = document.getElementById('form'),
      inputContact = formContact.getElementsByTagName('input');
      inputContact[1].onkeyup = function () {
    this.value = this.value.replace(/[^(\d)|(,)?+]/g, "");
  };

  function sendForm(elem) {
    elem.addEventListener('submit', function (event) {
      event.preventDefault();
      elem.appendChild(statusMessage);
      statusMessage.style.paddingTop = '20px';
      statusMessage.style.color = '#c78030';
    let formData = new FormData(elem);
            let obj = {};
              formData.forEach(function (value, key) {
              obj[key] = value;
            });
            let json = JSON.stringify(obj);

            function postData() {
      return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.onreadystatechange = function () {
                if (request.readyState < 4) {
                  resolve();
                } else if (request.readyState == 200 && request.status < 300) {
                  resolve();
                } else {
                  reject();                  
                }
              };         
            request.send(json);
      });
    }

    function clearInput() {
      for (let i = 0; i < elem.length; i++) {
        elem[i].value = '';
      }
      setTimeout(() => {
         statusMessage.innerHTML = '';
      }, 3000);
    }

    postData(formData)
      .then(() => statusMessage.innerHTML = message.loading)
      .then(() => {
        statusMessage.innerHTML = message.success;
        clearInput();
      })
      .catch(() => {
        statusMessage.innerHTML = message.failure;
      })
      .then(() => clearInput());
  });
}
  sendForm(form);
  sendForm(formContact);
  
       
  // SLIDER
  let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');
  showSlides(slideIndex);
  function showSlides(n) {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    slides.forEach((item) => item.style.display = 'none');
    dots.forEach((item) => item.classList.remove('dot-active'));
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }
  function plusSlides(n) { showSlides(slideIndex += n) }
  function currentSlide(n) { showSlides(slideIndex = n) }
  prev.addEventListener('click', () => plusSlides(-1));
  next.addEventListener('click', () => plusSlides(1));
  dotsWrap.addEventListener('click', (e) => {
    for (let i = 1; i < dots.length + 1; i++) {
      if (e.target.classList.contains('dot') && e.target == dots[i - 1]) currentSlide(i);
    }
  });
  // CALC
  let inputsCalc = document.querySelectorAll('.counter-block-input, #select'),
    inputCalc = document.querySelectorAll('.counter-block-input'),
    totalValue = document.querySelector('#total');
  totalValue.innerHTML = 0;
  inputsCalc.forEach((elem) => {
    elem.addEventListener('input', () => {
      let res = Math.round(+inputsCalc[0].value * +inputsCalc[1].value * +inputsCalc[2].options[inputsCalc[2].selectedIndex].value * 4000);
      animNum(totalValue, res, 50, 1000);
    })
  });
  inputCalc.forEach((elem) => {
    elem.addEventListener('input', function (e) {
      this.value = this.value.replace(/[^0-9]/g, '')
      let res = Math.round(+inputsCalc[0].value * +inputsCalc[1].value * +inputsCalc[2].options[inputsCalc[2].selectedIndex].value * 4000);
      animNum(totalValue, res, 50, 1000);
    });
  });

  function animNum(elem, n, f, t) {
    let num = n || 0,
      fps = f || 10,
      time = t || 1000,
      steps = time / (8000 / fps),
      cNum = 0,
      d0 = num / steps;
    let timer = setInterval(function () {
      cNum += d0;
      elem.innerHTML = cNum;
      steps--;
      if (steps <= 0) {
        clearInterval(timer);
      }
    }, (1000 / fps));
  }
});
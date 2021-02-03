import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

Swiper.use([Navigation, Pagination, Autoplay]);

import WOW from 'wow.js';





document.addEventListener('DOMContentLoaded', () => {
  new WOW({
    offset: 200
  }).init();

  // вставляем svg в код

  let svg = document.querySelectorAll('.svg');
  svg.forEach(element => {
    let img = element;
    let imgClass = img.getAttribute('class');
    let imgURL = img.getAttribute('src');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', imgURL);
    xhr.responseType = 'document'; 
    xhr.onreadystatechange = function (data) {
      if(xhr.response){
        let svgi = xhr.response.querySelector('svg');
        if (typeof imgClass !== 'undefined') {
          svgi.setAttribute('class', imgClass);
        }
        img.replaceWith(svgi);
      }
    }
    xhr.send();
  })

  // активация слайдера
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 40,
    speed: 400,
    loop: true,
    // autoplay: {
    //   delay: 4000,
    // },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });


   // активация fancybox
   jQuery('.fancybox').fancybox()

  //  аккордеон
  function accItem(){
    let items = document.querySelectorAll('.servicesBlock__acc');
    if(items.length > 0){
      items.forEach(item => {
        let bottom = item.querySelector('.servicesBlock__accBottom');
        let height = bottom.clientHeight;
        let styles = window.getComputedStyle(bottom);
        let paddingBottom = parseFloat(styles['padding-bottom'])
  
        bottom.style.maxHeight = '0px';
        bottom.style.paddingBottom = '0px';
        item.addEventListener('click', () => {
          let icon = item.querySelector('.servicesBlock__accIcon');
          let actHeight = bottom.clientHeight;
  
          icon.classList.toggle('active');
          bottom.classList.toggle('active')
  
          if(actHeight === 0){
            let newHeight = paddingBottom + height;
            bottom.style.maxHeight = `${newHeight}px`
            bottom.style.paddingBottom = `${paddingBottom}px`
          } else {
            bottom.style.maxHeight = `0px`
            bottom.style.paddingBottom = `0px`
          }
        })
      })
    }
  }
  accItem()

  function menuBtn(){
    let btns = document.querySelectorAll('.menuBtn');
    let popup = document.querySelector('.headerPopup');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        popup.classList.toggle('active')
      })
    })
  }
  menuBtn()

  // табы в моб версии
  function tabMob() {
    let tabs = document.querySelectorAll('.servicesBlock__tab');
    let contents = document.querySelectorAll('.servicesBlock__tabContent');
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach((remTab, x) => {
          remTab.classList.remove('active');
          contents[x].classList.remove('active');
        })

        tab.classList.add('active');
        contents[i].classList.add('active');
      })
    })
  }
  tabMob()


  // Настройка якорей

  const anchors = document.querySelectorAll('.anchor')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      
      const blockID = anchor.getAttribute('href').substr(1)
      
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

  // Убираем меню при клике на якори
  function removeMenu() {
    let links = document.querySelectorAll('.headerPopup__link');
    let popup = document.querySelector('.headerPopup');
    links.forEach(link => {
      link.addEventListener('click', () => {
        popup.classList.remove('active');
      })
    })
  }
  removeMenu()




  // Настройка формы
  function checkInput(value) {
    if (value == '') {
        return false;
    } else {
        return true;
    }
  }


  jQuery('.contactBlock__form').submit(function(e) {
    e.preventDefault();
    // Проверка на верно введенный номер телефона (проверка на пустоту)
    let phone = jQuery(this).find('input[name="phone"]').val();
    let name = jQuery(this).find('input[name="name"]').val();
    let email = jQuery(this).find('input[name="email"]').val();
    let link = jQuery(this).find('input[name="link"]').val();
    let message = jQuery(this).find('input[name="message"]').val();

    if (checkInput(name)) {
      jQuery(this).find('input[name="name"]').removeClass('error');
    } else {
      jQuery(this).find('input[name="name"]').addClass('error');
    }

    if (checkInput(phone)) {
      jQuery(this).find('input[name="phone"]').removeClass('error');
    } else {
      jQuery(this).find('input[name="phone"]').addClass('error');
    }
    
    if (checkInput(email)) {
      jQuery(this).find('input[name="email"]').removeClass('error');
    } else {
      jQuery(this).find('input[name="email"]').addClass('error');
    }

    if (checkInput(phone) && checkInput(name) && checkInput(email)) {
        jQuery.ajax({
            url: "wp-content/themes/mytheme/sendMessage.php",
            type: "POST",
            data: {
              name: name,
              phone: phone,
              email: email,
              link: link,
              message: message
            },
            success: function(){
              jQuery.fancybox.close();
              jQuery.fancybox.open( jQuery('#thanksPopup') );
              setTimeout(function() {
                jQuery.fancybox.close();
              }, 2000);
            }
        });
    } else {
        console.log('Ошибка');
    }
  });
  
})
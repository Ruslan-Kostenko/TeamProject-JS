// Swiper=======================================
import Swiper from 'swiper/swiper-bundle.min.mjs';
import '../../node_modules/swiper/swiper-bundle.min.css';


const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    slidesPerView: 0.65,
 
    speed: 500,

    breakpoints: {
      // when window width is >= 375px
      375: {
      slidesPerView: 0.65,
        spaceBetween: 8
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 0.85,
        spaceBetween: 16
      },
      // when window width is >= 1280px
      1280: {
        slidesPerView: 0.81,
        spaceBetween: 16
      }
    }
  
  });
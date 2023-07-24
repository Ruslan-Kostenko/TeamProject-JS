// import Swiper JS
import Swiper from 'swiper/swiper-bundle.min.mjs';
// import Swiper styles
import '../../node_modules/swiper/swiper-bundle.min.css';


const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    slidesPerView: 0.65,
  // spaceBetween: 18,
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
    // when window width is >= 1200px
    1200: {
      slidesPerView: 0.81,
      spaceBetween: 16
    }
  }
  
  });
// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import '../../node_modules/swiper/swiper.min.css';


// import '../../node_modules/swiper/swiper.css';
// import '../../node_modules/swiper/modules/pagination/pagination-element.min.css';
// import Swiper, { Pagination, Autoplay } from 'swiper';

// init Swiper:
const swiper = new Swiper('.swiper', {
    // modules: [Pagination, Autoplay],
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

const ulSwiperEl = document.querySelector('.swiper-wrapper');
const URL = 'https://tasty-treats-backend.p.goit.global/api/events';

getMasterChief(URL).then(data => {
  ulSwiperEl.innerHTML = createMasterclassMarkup(data);
}).catch(error => {
  console.error('Помилка вашого запиту:', error);
});

function getMasterChief() {
  return fetch(URL).then(resp => {
    if(!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
};


function createMasterclassMarkup(masters) {
  return masters.map((master) => {
    const chefImg = master.cook.imgUrl ? `<img src="${master.cook.imgUrl}" alt="${master.cook.name}"/>` : '';

    const dishThumbImg = master.topic.previewUrl ? `<img src="${master.topic.previewUrl}" alt="dish"/>` : '';
    
    const dishImg = master.topic.imgUrl ? `<img src="${master.topic.imgUrl}" alt="dish"/>` : '';


    return `<li class="swiper-slide masterclass-item">
      <div class="masterChief">
        ${chefImg}
      </div>
      <div class="dish-thumb">
        ${dishThumbImg}
        <div class="dish-content">
          <h3 class="dish-name">${master.topic.name}</h3>
          <p class="dish-text">${master.topic.area}</p>
        </div>
      </div>
      <div class="dish">
        ${dishImg}
      </div>
    </li>`;
  }).join('');
}

// Swiper=======================================
import Swiper from 'swiper/swiper-bundle.min.mjs';
import '../../node_modules/swiper/swiper-bundle.min.css';


const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 5000,
  },

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

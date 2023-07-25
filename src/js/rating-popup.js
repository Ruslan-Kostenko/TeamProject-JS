import { refs } from './js-refs';
// -----------------FOR BUTTON "GIVE A RATING"------------------------
refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

// ---------------------FOR MODAL JAVASCRIPT---------------------------
const getData = document.getElementById('add');
const inputEl = document.querySelector('.form-input');
const btnSend = document.querySelector('.submit-btn');
const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
  initRatings();
}

function initRatings() {
  let ratingActive, ratingValue;
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRating(rating);
  }

  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth();
    if (rating.classList.contains('rating-set')) {
      setRating(rating);
    }
  }

  function initRatingVars(rating) {
    ratingActive = rating.querySelector('.rating-active');
    ratingValue = rating.querySelector('.rating-value');
  }
  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }
  function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.rating-item');
    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      ratingItem.addEventListener('mouseenter', function (e) {
        initRatingVars(rating);
        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener('mouseleave', function (e) {
        setRatingActiveWidth();
      });
      ratingItem.addEventListener('click', function (e) {
        initRatingVars(rating);
        // if (rating.dataset.ajax) {
        //   setRatingValue(ratingItem.value, rating);
        // } else {
        ratingValue.innerHTML = index + 1;
        setRatingActiveWidth();
        // }
      });
    }
  }

  getData.addEventListener('click', getValue);

  function getValue() {
    var getInputData = document.getElementById('get_data').value;
    inputEl.value = '';
    if (getInputData == '') {
      alert('Enter you email, please');
      return;
    }
    // refs.modal.classList.toggle('is-hidden');
    console.log(getInputData);
  }

  // function closeModal() {
  //   refs.modal.classList.toggle('is-hidden');
  // }
  // async function setRatingValue(value, rating) {
  //   if (!rating.classList.add('rating-sending')) {
  //     rating.classList.add('rating-sending');
  //     let response = await fetch(
  //       'https://tasty-treats-backend.p.goit.global/api/recipes',
  //       {
  //         method: 'PATCH',
  //         body: JSON.stringify({
  //           userRating: value,
  //         }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       const result = await response.json();
  //       const newRating = result.newRating;
  //       ratingValue.innerHTML = newRating;
  //       setRatingActiveWidth();
  //       rating.classList.remove('rating-sending');
  //     } else {
  //       alert('False');
  //       PerformanceResourceTiming.classList.remove('rating-sending');
  //     }
  //   }
  // }
}
const modalBack = document.querySelector('.backdrop');
document.addEventListener('click', function (e) {
  if (e.currentTarget == e.target) {
    refs.modal.classList.toggle('is-hidden');
  }
});

document.addEventListener('keydown', function (e) {
  if (e.code === 'Escape') {
    // код клавиши Escape, но можно использовать e.key
    modalBack.classList.add('is-hidden');
  }
});

import { refs } from './js-refs';
// -----------------FOR BUTTON "GIVE A RATING"------------------------
refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modal.classList.toggle('is-visibility-raiting');
}

// ---------------------FOR MODAL JAVASCRIPT---------------------------
const getData = document.getElementById('add');
const input = document.querySelector('.form-input');
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
        //
        // } else {
        ratingValue.innerHTML = index + 1;
        setRatingValue(ratingItem.value, rating);
        setRatingActiveWidth();

        console.log(ratingItem.value);
        // }
      });
    }
  }

  // const options =  {
  //       method: 'PATCH',
  //       body: JSON.stringify({
  //         userRating: value,
  //         userMail: getInputData,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  // }

  // return fetch('https://tasty-treats-backend.p.goit.global/api/recipes/', options)
  //   .then(resp => {
  //     if (!resp.ok) {
  //       throw new Error(resp.statusText)
  //     }
  //     return resp.json()
  //   })
  //   .then(data => console.log(data))
  // .catch(err=>console.log(err))

  async function setRatingValue(value, mail) {
    // const options = {
    //   method: 'PATCH',
    //   body: JSON.stringify({
    //     userRating: value,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };

    // return fetch(
    //   'https://tasty-treats-backend.p.goit.global/api/recipes/{id}/rating',
    //   options
    // )
    //   .then(resp => {
    //     if (!resp.ok) {
    //       throw new Error(resp.statusText);
    //     }
    //     return resp.json();
    //   })
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err));
    //  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // if (!rating.classList.add('rating-sending')) {
    //   rating.classList.add('rating-sending');
    let response = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/recipes',
      {
        method: 'POST',
        body: JSON.stringify({
          userRating: value,
          emailUser: mail,
          // userMail: getInputData,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      const result = await response.json();
      const newRating = result.newRating;
      ratingValue.innerHTML = newRating;
      setRatingActiveWidth();
    } else {
      alert('False');
    }
    // }
  }
}

const modalBack = document.querySelector('.backdrop');

// const modalEl = document.querySelector('.modal');
// document.addEventListener('click', function (e) {
//   const click = e.composedPath().includes('is-hidden');
//   if (!click) {
//     // refs.modal.classList.toggle('is-hidden');
//     modalEl.style.display = 'none';
//   }
//   console.log(click);
// });

document.addEventListener('keydown', function (e) {
  if (e.code === 'Escape') {
    // код клавиши Escape, но можно использовать e.key
    modalBack.classList.add('is-hidden');
  }
});

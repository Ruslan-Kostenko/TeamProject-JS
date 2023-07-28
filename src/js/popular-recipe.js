// const closeSVG = document.querySelector('.close-recipe-svg');
const backDrop = document.querySelector('.backdrop-popup-recipe');
const popUp = document.querySelector('.pop-up-recipe');
const videoContainer = document.querySelector('#video-container');
let player;

const BASE_URL_POPUP =
  'https://tasty-treats-backend.p.goit.global/api/recipes/';
const SECOND_URL = 'https://tasty-treats-backend.p.goit.global/api/ingredients';
const API_KEY = 'AIzaSyAX44YCtOJPGkNiZtRXagJevTZUvVOUYVc';

// function getRandomIndex(max) {
//   return Math.floor(Math.random() * max);
// }

// function fetchRecipeData() {

//     Promise.all([fetch(BASE_URL_POPUP), fetch(SECOND_URL)])
//         .then(responses => Promise.all(responses.map(response => response.json())))
//         .then(data => {
//             const recipesData = data[0].results;
//             const ingredientsData = data[1];

//             const recipeHeader = document.querySelector('.pop-up-recipe-header');
//             const recipeDescription = document.querySelector('.recipe-description');
//             const tagsList = document.querySelector('.tags-buttons');
//             tagsList.innerHTML = '';
//             const recipeIngredients = document.querySelector('.recipe-list');
//             recipeIngredients.innerHTML = '';
//             const recipeRatingElement = document.querySelector('.rating-value');
//             const recipeTime = document.querySelector('.span-time');

//             const randomIndex = getRandomIndex(recipesData.length);
//             const recipe = recipesData[randomIndex];

//             const title = recipe.title;
//             const videoId = getYouTubeVideoId(recipe.youtube);
// const videoSrc = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=https://your-origin.com&modestbranding=1&rel=0&autoplay=1&showinfo=0&controls=1&mute=0&loop=0&iv_load_policy=3&cc_load_policy=1&start=0&theme=light&color=white&fs=1&autohide=2&enablejsapi=1`;
//             const descriptionPopup = recipe.instructions;
//             const tags = recipe.tags;
//             const ingredients = recipe.ingredients;
//             const ratingValue = recipe.rating;
//             const timeValue = recipe.time;

//             recipeRatingElement.textContent = ratingValue;
//             recipeTime.textContent = `${timeValue} min`;

//             recipeDescription.textContent = descriptionPopup;

//             recipeHeader.textContent = title;

//             ingredients.forEach(ingredient => {
//                 const matchedIngredient = ingredientsData.find(data => data._id === ingredient.id);
//                 if (matchedIngredient) {
//                     ingredient.name = matchedIngredient.name;
//                 }
//             });

// ingredients.forEach(ingredient => {
//     const ingredientItem = document.createElement('li');
//     const ingredientName = document.createElement('span');
//     ingredientName.textContent = ingredient.name;
//     ingredientName.classList.add('ingredient-name');

//     const measureContent = document.createElement('span');
//     measureContent.textContent = ingredient.measure;
//     measureContent.classList.add('measure-content');

//     ingredientItem.classList.add('recipe-item');
//     ingredientItem.appendChild(ingredientName);
//     ingredientItem.appendChild(measureContent);

//     recipeIngredients.appendChild(ingredientItem);
// });

// if (tags.length > 0) {
//     tags.forEach(tag => {
//         const tagBtn = document.createElement('button');
//         tagBtn.textContent = `#${tag}`;
//         tagBtn.classList.add('tag-btn');
//         tagsList.appendChild(tagBtn);
//     });

//     const tagButtons = document.querySelectorAll('.tags-buttons .tag-btn');
//     tagButtons.forEach(button => {
//         button.style.display = 'inline-block';
//     });
// }

//             createYouTubePlayer(videoSrc);
//         })
//         .catch(error => console.log(error.message));
// }
// closeSVG.addEventListener('click', onClickSVG);

function onClickSVG() {
  stopVideoAndCloseModal();
}

backDrop.addEventListener('click', onClickBackDrop);

function onClickBackDrop(event) {
  if (event.target === backDrop) {
    popUp.style.display = 'none';
    backDrop.style.display = 'none';
    stopVideoAndCloseModal();
  }
}

document.addEventListener('keydown', onDocumentKeyDown);

function onDocumentKeyDown(event) {
  if (event.key === 'Escape') {
    popUp.style.display = 'none';
    backDrop.style.display = 'none';
  }
}

function stopVideoAndCloseModal() {
  if (typeof player !== 'undefined' && typeof player.stopVideo === 'function') {
    player.stopVideo();
  }

  popUp.style.display = 'none';
  backDrop.style.display = 'none';
}

// function createYouTubePlayer(videoSrc) {
//   player = new YT.Player('video-container', {
//     videoId: getYouTubeVideoId(videoSrc),
//     playerVars: {
//       // Дополнительные параметры плеера, если нужно
//       // Например, autoplay: 1 (1 - включить автовоспроизведение, 0 - выключить)
//     },
//     events: {
//       onStateChange: onPlayerStateChange,
//     },
//   });
// }

// function onPlayerStateChange(event) {
//   if (event.data === YT.PlayerState.PLAYING) {
//     player
//       .getIframe()
//       .contentWindow.addEventListener('keydown', onPlayerKeyDown);
//   } else {
//     player
//       .getIframe()
//       .contentWindow.removeEventListener('keydown', onPlayerKeyDown);
//   }
// }

// function getYouTubeVideoId(videoSrc) {
//   const videoIdMatch = videoSrc.match(/(?:\?v=|\/embed\/|\.be\/)([\w\-]{11})/);
//   return videoIdMatch ? videoIdMatch[1] : null;
// }

const favouriteBtn = document.querySelector('.btn-add-recipe-favourite');
let isFavorite = false;

function onFavouriteBtnClick() {
  isFavorite = !isFavorite; // Инвертируем состояние при каждом клике

  if (isFavorite) {
    favouriteBtn.classList.add('active');
    favouriteBtn.textContent = 'Remove from favorite';
  } else {
    favouriteBtn.classList.remove('active');
    favouriteBtn.textContent = 'Add to Favorite';
  }
}
// const seeRecipe = document.querySelector('.recipe_desc_btn');

// Добавляем слушатель на кнопку
// favouriteBtn.addEventListener('click', onFavouriteBtnClick);

// fetchRecipeData();

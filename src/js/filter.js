'use strict';
import axios from 'axios';

const refs = {
  searchInput: document.querySelector('.search_input'),
  time: document.querySelector('.time_select'),
  area: document.querySelector('.area_select'),
  ingredients: document.querySelector('.ingredients_select'),
};

// const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

// // API

// fetch(`${BASE_URL}`)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .then(data => data.results.map(recipe => console.log(recipe)));

// const handleSearchForm = function (event) {
//   searchQuerry = event.currentTarget.value.trim();
//   console.log(searchQuerry);
// };

// refs.searchInput.addEventListener('input', handleSearchForm);

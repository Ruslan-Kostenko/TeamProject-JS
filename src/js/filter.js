// <<<<<<< Updated upstream
// // import axios from 'axios';
// =======
// // import { debounce } from 'lodash';
// >>>>>>> Stashed changes

const refs = {
  UlCardEl: document.querySelector('.card_list'),
  claerBtn: document.querySelector('.clear_button'),
  searchInput: document.querySelector('.search_input'),
  time: document.querySelector('.time_select'),
  area: document.querySelector('.area_select'),
  ingredients: document.querySelector('.ingredients_select'),
};

// SEARCH;

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

const handleSearchForm = function (event) {
  searchQuery = event.currentTarget.value.trim();

  const resultArr = fetch(`${BASE_URL}?limit=285&page=1`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      filteredItems = data.results.filter(res =>
        res.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
      return filteredItems;
    })
    .then(arr => {
      refs.UlCardEl.innerHTML = makeCardMark(arr);

      refs.UlCardEl.addEventListener('click', event => {
        if (!event.target.classList.contains('recipe_desc_btn')) {
          return;
        }
        const seeRecipe = document.querySelectorAll('.recipe_desc_btn');
        onClickRecipeDescrBtn();

        function onClickRecipeDescrBtn() {
          // Toggle the display of the modal and backdrop
          const popUpRecipe = document.querySelector('.pop-up-recipe');
          const backdropPopupRecipe = document.querySelector(
            '.backdrop-popup-recipe'
          );

          // Toggle the visibility of the modal and backdrop using classes
          popUpRecipe.style.display = 'block';
          backdropPopupRecipe.style.display = 'block';
        }
      });
    });
};

refs.searchInput.addEventListener('input', handleSearchForm);

const makeCardMark = function (recipes) {
  return recipes
    .map(
      recipe => ` <li class="card_item">
<img src="${recipe.thumb}" alt="${recipe.title}" class="card_img" />
<button class="card_fav">
          <svg
            class="card_heart"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.9944 3.70783C9.16163 1.5652 6.10542 0.988839 3.80912 2.95085C1.51282 4.91285 1.18954 8.19323 2.99283 10.5137C4.49215 12.443 9.02961 16.5121 10.5167 17.8291C10.6831 17.9764 10.7663 18.0501 10.8633 18.0791C10.948 18.1043 11.0407 18.1043 11.1254 18.0791C11.2224 18.0501 11.3056 17.9764 11.472 17.8291C12.9591 16.5121 17.4966 12.443 18.9959 10.5137C20.7992 8.19323 20.5154 4.89221 18.1796 2.95085C15.8439 1.00948 12.8271 1.5652 10.9944 3.70783Z"
              stroke="#F8F8F8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
</button>
<div class="recipe_desc">
  <h3 class="recipe_desc_title">${recipe.title}</h3>
  <p class="recipe_desc_overview">
  ${recipe.description}
  </p>
  <div class="card_info">
    <p class="card_rating">Rating: ${recipe.rating}</p>
    <button value=${recipe._id} class="recipe_desc_btn">See recipe</button>
  </div>
</div>
</li>`
    )
    .join('');
};

// RESET BUTTON

const resetAllFilters = () => {
  refs.searchInput.value = '';
  refs.time.selectedIndex = 0;
  refs.area.selectedIndex = 0;
  refs.ingredients.selectedIndex = 0;

  function fetchAllRecept() {
    return fetch(
      `https://tasty-treats-backend.p.goit.global/api/recipes?limit=9`
    ).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    });
  }

  fetchAllRecept().then(data => {
    return (UlCardEl.innerHTML = makeCardMark(data.results));
  });
};

refs.claerBtn.addEventListener('click', resetAllFilters);

// СLASS;

// export class TestyTreatsAPI {
//   #BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

//   currentPage = 1;
//   limitRecipes = 288;

//   async fetchRecipes() {
//     return await axios.get(`${this.#BASE_URL}`, {
//       params: {
//         limit: this.limitRecipes,
//         page: this.currentPage,
//       },
//     });
//   }
// }

// const testyTreatsAPI = new TestyTreatsAPI();

// // INPUT

// const handleSearchForm = async () => {
//   try {
//     searchQuery = event.currentTarget.value.trim();

//     const { data } = await testyTreatsAPI.fetchRecipes();

//     filteredItems = data.results.filter(res =>
//       res.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
//     );

//     refs.UlCardEl.innerHTML = makeCardMark(filteredItems);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// // RESET BUTTON

// const resetAllFilters = async () => {
//   try {
//     refs.searchInput.value = '';
//     refs.time.selectedIndex = 0;
//     refs.area.selectedIndex = 0;
//     refs.ingredients.selectedIndex = 0;

//     testyTreatsAPI.limitRecipes = 9;

//     const { data } = await testyTreatsAPI.fetchRecipes();
//     refs.UlCardEl.innerHTML = makeCardMark(data.results);

//   } catch (err) {
//     console.log(err.message);
//   }
// };

// // FNC

// refs.searchInput.addEventListener('input', handleSearchForm);
// refs.claerBtn.addEventListener('click', resetAllFilters);

// const makeCardMark = function (recipes) {
//   return recipes
//     .map(
//       recipe => ` <li class="card_item">
// <img src="${recipe.thumb}" alt="${recipe.title}" class="card_img" />
// <button class="card_fav">
//           <svg
//             class="card_heart"
//             xmlns="http://www.w3.org/2000/svg"
//             width="22"
//             height="20"
//             viewBox="0 0 22 20"
//             fill="none"
//           >
//             <path
//               fill-rule="evenodd"
//               clip-rule="evenodd"
//               d="M10.9944 3.70783C9.16163 1.5652 6.10542 0.988839 3.80912 2.95085C1.51282 4.91285 1.18954 8.19323 2.99283 10.5137C4.49215 12.443 9.02961 16.5121 10.5167 17.8291C10.6831 17.9764 10.7663 18.0501 10.8633 18.0791C10.948 18.1043 11.0407 18.1043 11.1254 18.0791C11.2224 18.0501 11.3056 17.9764 11.472 17.8291C12.9591 16.5121 17.4966 12.443 18.9959 10.5137C20.7992 8.19323 20.5154 4.89221 18.1796 2.95085C15.8439 1.00948 12.8271 1.5652 10.9944 3.70783Z"
//               stroke="#F8F8F8"
//               stroke-width="2"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//             />
//           </svg>
// </button>
// <div class="recipe_desc">
//   <h3 class="recipe_desc_title">${recipe.title}</h3>
//   <p class="recipe_desc_overview">
//   ${recipe.description}
//   </p>
//   <div class="card_info">
//     <p class="card_rating">Rating: ${recipe.rating}</p>
//     <button value=${recipe._id} class="recipe_desc_btn">See recipe</button>
//   </div>
// </div>
// </li>`
//     )
//     .join('');
// };

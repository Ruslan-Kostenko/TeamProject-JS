import { debounce } from 'lodash';

const refs = {
  UlCardEl: document.querySelector('.card_list'),
  claerBtn: document.querySelector('.clear_button'),
  searchInput: document.querySelector('.search_input'),
  time: document.querySelector('.time_select'),
  area: document.querySelector('.area_select'),
  ingredients: document.querySelector('.ingredients_select'),
};

let currentPage = 1;
let setLimit = 0;

function setLimitValue() {
  if (window.innerWidth < 768) {
    setLimit = 6;
  } else if (window.innerWidth < 1280) {
    setLimit = 8;
  } else {
    setLimit = 9;
  }
}
setLimitValue();

// SEARCH;

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

const handleSearchForm = function (event) {
  event.preventDefault();

  searchQuery = event.target.value.trim();

  const resultArra = fetchAllRecept(currentPage, 288).then(data => {
    filteredItems = data.results.filter(res =>
      res.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    function renderSearch(arrData, rowPerPage, page) {
      page--;
      const start = rowPerPage * page;
      const end = start + rowPerPage;
      const paginatedData = arrData.slice(start, end);

      totalPages = filteredItems.length / setLimit;
      paginListEl.innerHTML = '';
      creatPaginMarkup(totalPages);

      return (refs.UlCardEl.innerHTML = makeCardMark(paginatedData));
    }

    renderSearch(filteredItems, setLimit, currentPage);

    //  SEE RECIPE

    refs.UlCardEl.addEventListener('click', event => {
      if (!event.target.classList.contains('recipe_desc_btn')) {
        return;
      }
      const seeRecipe = document.querySelectorAll('.recipe_desc_btn');
      onClickRecipeDescrBtn();

      function onClickRecipeDescrBtn() {
        const popUpRecipe = document.querySelector('.pop-up-recipe');
        const backdropPopupRecipe = document.querySelector(
          '.backdrop-popup-recipe'
        );

        popUpRecipe.style.display = 'block';
        backdropPopupRecipe.style.display = 'block';
      }
    });
    return filteredItems;
  });
};

//
// PAGINATION

const paginListEl = document.querySelector('.pagination__list');

function creatPaginMarkup(totalPages) {
  for (let i = 0; i < totalPages; i + 1) {
    const paginItem = displayPaginationBtn((i += 1));
    paginListEl.appendChild(paginItem);
  }
}

function displayPaginationBtn(page) {
  const paginItemEl = document.createElement('li');
  paginItemEl.classList.add('pagination__item');
  paginItemEl.innerText = page;
  return paginItemEl;
}

paginListEl.addEventListener('click', evt => {
  if (!evt.target.classList.contains('pagination__item')) {
    return;
  }

  currentPage = evt.target.textContent;
  fetchAllRecept(currentPage, setLimit)
    .then(data => {
      refs.UlCardEl.innerHTML = makeCardMark(data.results);
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    });
});

//

//

//

// RESET BUTTON

const resetAllFilters = () => {
  refs.searchInput.value = '';
  refs.time.selectedIndex = 0;
  refs.area.selectedIndex = 0;
  refs.ingredients.selectedIndex = 0;
  currentPage = 1;

  fetchAllRecept(currentPage, setLimit).then(data => {
    refs.UlCardEl.innerHTML = '';
    paginListEl.innerHTML = '';
    creatPaginMarkup(data.totalPages);
    return (refs.UlCardEl.innerHTML = makeCardMark(data.results));
  });
};

// FCN and MARKAP

refs.claerBtn.addEventListener('click', resetAllFilters);
refs.searchInput.addEventListener('input', debounce(handleSearchForm, 500));

function fetchAllRecept(page, limit) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
  return fetch(`${BASE_URL}recipes?page=${page}&limit=${limit}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

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

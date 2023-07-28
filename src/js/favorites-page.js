// Anton Vasyliev

let savedRecipes = localStorage.getItem('selectedRecipes');

if (!savedRecipes || JSON.parse(savedRecipes).length === 0) {
  document.getElementById('fav-recipe-list').classList.add('fav-hide');
  document.getElementById('empty-favorites').style.display = 'flex';
} else {
  document.getElementById('fav-recipe-list').classList.remove('fav-hide');
  document.getElementById('empty-favorites').style.display = 'none';

  let favoriteRecipes = JSON.parse(savedRecipes);

  const uniqueCategories = [
    ...new Set(favoriteRecipes.map(recipe => recipe.category)),
  ];

  const categoryFilterContainer = document.getElementById(
    'category-filter-container'
  );

  function updateRecipeList(selectedCategory) {
    const filteredRecipes = selectedCategory
      ? favoriteRecipes.filter(recipe => recipe.category === selectedCategory)
      : favoriteRecipes;

    const recipeList = document.getElementById('fav-recipe-list');
    const recipeCards = filteredRecipes.map(recipe => {
      return `
        <li class="fav-recipe-list-item">
          <img class="fav-recipe-card-img" src="${recipe.preview}" alt="${recipe.title}" />
          <button class="fav-on-favorite-button" data-recipe-id="${recipe._id}" type="button">
            <svg class="icon-heart" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9939 4.70783C9.16115 2.5652 6.10493 1.98884 3.80863 3.95085C1.51234 5.91285 1.18905 9.19323 2.99234 11.5137C4.49166 13.443 9.02912 17.5121 10.5163 18.8291C10.6826 18.9764 10.7658 19.0501 10.8629 19.0791C10.9475 19.1043 11.0402 19.1043 11.1249 19.0791C11.2219 19.0501 11.3051 18.9764 11.4715 18.8291C12.9586 17.5121 17.4961 13.443 18.9954 11.5137C20.7987 9.19323 20.5149 5.89221 18.1791 3.95085C15.8434 2.00948 12.8266 2.5652 10.9939 4.70783Z" fill="white" />
            </svg>
          </button>
          <h3 class="fav-recipe-card-title">${recipe.title}</h3>
          <p class="fav-recipe-card-descr">${recipe.description}</p>
          <div class="favorite-card-rating-container">
            <div class="favorite-card-rating">
              <div class="favorite-card-rating-value">${recipe.rating}</div>
              <div class="favorite-card-rating-body">
                <div class="favorite-card-rating-active"></div>
                <div class="favorite-card-rating-items">
                  <input type="radio" class="favorite-card-rating-item" value="1" name="rating">
                  <input type="radio" class="favorite-card-rating-item" value="2" name="rating">
                  <input type="radio" class="favorite-card-rating-item" value="3" name="rating">
                  <input type="radio" class="favorite-card-rating-item" value="4" name="rating">
                  <input type="radio" class="favorite-card-rating-item" value="5" name="rating">
                </div>
              </div>
            </div>
            <button class="fav-see-recipe-button" type="button">See recipe</button>
          </div>
        </li>
      `;
    });

    recipeList.innerHTML = recipeCards.join('');

    const onFavoriteButtons = document.getElementsByClassName(
      'fav-on-favorite-button'
    );
    for (const button of onFavoriteButtons) {
      button.addEventListener('click', handleOnFavoriteButtonClick);
    }

    initRatings(); // Reinitialize ratings after updating the recipe list
  }

  function handleOnFavoriteButtonClick(event) {
    const recipeId = event.target.dataset.recipeId;
    favoriteRecipes = favoriteRecipes.filter(recipe => recipe._id !== recipeId);
    localStorage.setItem('selectedRecipes', JSON.stringify(favoriteRecipes));
    updateRecipeList();
  }

  function handleAllCategoriesClick() {
    const categoryFilterButtons = document.getElementsByClassName(
      'fav-category-filter-button'
    );
    for (const button of categoryFilterButtons) {
      button.classList.remove('active');
    }
    updateRecipeList();
  }

  function renderCategoryFilters() {
    const allCategoriesButton = document.createElement('button');
    allCategoriesButton.classList.add('fav-category-filter-button');
    allCategoriesButton.textContent = 'All categories';
    allCategoriesButton.addEventListener('click', handleAllCategoriesClick);
    categoryFilterContainer.appendChild(allCategoriesButton);

    const filtersHTML = uniqueCategories
      .map(
        category => `
        <button class="fav-category-filter-button" data-category="${category}">${category}</button>
      `
      )
      .join('');

    categoryFilterContainer.innerHTML += filtersHTML;

    const categoryFilterButtons = document.getElementsByClassName(
      'fav-category-filter-button'
    );
    for (const button of categoryFilterButtons) {
      button.addEventListener('click', handleCategoryFilterClick);
    }
  }

  function handleCategoryFilterClick(event) {
    const category = event.target.dataset.category;
    updateRecipeList(category);
  }

  renderCategoryFilters();
  updateRecipeList();
}

function initRatings() {
  const ratings = document.getElementsByClassName('favorite-card-rating');

  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    const ratingValue = parseFloat(
      rating.querySelector('.favorite-card-rating-value').textContent
    );
    const ratingActive = rating.querySelector('.favorite-card-rating-active');
    setRatingActiveWidth(ratingActive, ratingValue);
  }

  function setRatingActiveWidth(ratingActive, ratingValue) {
    const ratingActiveWidth = (ratingValue / 5) * 100;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }
}

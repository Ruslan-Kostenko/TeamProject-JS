// import axios from 'axios';

// const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

// async function fetchDataFromBackend() {
//   try {
//     // Змінюємо значення "limit" на 9 у параметрі запиту
//     const response = await axios.get(`${BASE_URL}recipes?limit=9`);

//     // Отримуємо масив рецептів з ключа "results"
//     const dataArray = response.data.results;

//     // Використовуємо метод map для створення нового масиву з розміткою
//     const recipesHTMLArray = dataArray.map(
//       recipe => `
//       <li>
//         <img src="${recipe.preview}" alt="${recipe.title}" />
//         <button class="icon-button" data-recipe-id="${recipe._id}" type="button">іконка</button>
//         <h3>${recipe.title}</h3>
//         <p>${recipe.description}</p>
//         <div>
//           <p>${recipe.rating}</p>
//           <button type="button">рецепт</button>
//         </div>
//       </li>
//     `
//     );

//     // Отримуємо елемент галереї з HTML
//     const galleryElement = document.getElementById('recipe-list');

//     // Приєднуємо розмітку до галереї
//     galleryElement.innerHTML = recipesHTMLArray.join('');

//     // Додаємо обробник подій для кожної кнопки "іконка"
//     const iconButtons = document.querySelectorAll('.icon-button');
//     iconButtons.forEach(button => {
//       button.addEventListener('click', () => {
//         // Отримуємо id рецепту з атрибута data-recipe-id кнопки
//         const recipeId = button.dataset.recipeId;

//         // Отримуємо поточний об'єкт даних для обраної картки
//         const selectedRecipe = dataArray.find(
//           recipe => recipe._id === recipeId
//         );

//         // Отримуємо масив обраних карток з localStorage (якщо він існує)
//         let selectedRecipesArray =
//           JSON.parse(localStorage.getItem('selectedRecipes')) || [];

//         // Перевіряємо, чи вже існує обраний рецепт з таким id
//         const existingIndex = selectedRecipesArray.findIndex(
//           recipe => recipe._id === recipeId
//         );

//         if (existingIndex !== -1) {
//           // Якщо рецепт знайдено в localStorage, видаляємо його з масиву обраних карток
//           selectedRecipesArray.splice(existingIndex, 1);
//           console.log('Картка успішно видалена з localStorage');
//         } else {
//           // Якщо рецепт не знайдено в localStorage, додаємо його до масиву обраних карток
//           selectedRecipesArray.push(selectedRecipe);
//           console.log('Картка успішно збережена в localStorage');
//         }

//         try {
//           // Зберігаємо оновлений масив обраних карток у localStorage
//           localStorage.setItem(
//             'selectedRecipes',
//             JSON.stringify(selectedRecipesArray)
//           );
//         } catch (error) {
//           // Обробка помилок при збереженні у localStorage
//           console.error('Помилка збереження у localStorage:', error.message);
//         }
//       });
//     });
//   } catch (error) {
//     // Обробка помилок
//     console.error('Помилка отримання даних:', error.message);
//   }
// }

// // Викликаємо функцію для отримання даних та відмалювання галереї
// fetchDataFromBackend();

let savedRecipes = localStorage.getItem('selectedRecipes');

// Перевірка, чи є дані в local storage або чи порожній масив улюблених рецептів
if (!savedRecipes || JSON.parse(savedRecipes).length === 0) {
  // Приховуємо список рецептів
  document.getElementById('recipe-list').classList.add('hide');
  // Показуємо повідомлення про порожній список улюблених рецептів
  document.getElementById('empty-favorites').style.display = 'flex';
} else {
  // Якщо є улюблені рецепти, то показуємо список рецептів
  document.getElementById('recipe-list').classList.remove('hide');
  document.getElementById('empty-favorites').style.display = 'none';

  // Парсимо рядок JSON у JavaScript об'єкт
  let favoriteRecipes = JSON.parse(savedRecipes);

  // Отримання унікальних категорій з об'єктів рецептів
  const uniqueCategories = [
    ...new Set(favoriteRecipes.map(recipe => recipe.category)),
  ];

  // Отримання контейнера для блоку з кнопками фільтрів
  const categoryFilterContainer = document.getElementById(
    'category-filter-container'
  );

  // Функція для оновлення списку рецептів з урахуванням фільтру
  function updateRecipeList(selectedCategory) {
    const filteredRecipes = selectedCategory
      ? favoriteRecipes.filter(recipe => recipe.category === selectedCategory)
      : favoriteRecipes;

    const recipeList = document.getElementById('recipe-list');
    const recipeCards = filteredRecipes.map(recipe => {
      return `
            <li class="recipe-list-item">
              <img class="recipe-card-img" src="${recipe.preview}" alt="${recipe.title}" />
              <button class="on-favorite-button" data-recipe-id="${recipe._id}" type="button">
              <svg class="icon-heart" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9939 4.70783C9.16115 2.5652 6.10493 1.98884 3.80863 3.95085C1.51234 5.91285 1.18905 9.19323 2.99234 11.5137C4.49166 13.443 9.02912 17.5121 10.5163 18.8291C10.6826 18.9764 10.7658 19.0501 10.8629 19.0791C10.9475 19.1043 11.0402 19.1043 11.1249 19.0791C11.2219 19.0501 11.3051 18.9764 11.4715 18.8291C12.9586 17.5121 17.4961 13.443 18.9954 11.5137C20.7987 9.19323 20.5149 5.89221 18.1791 3.95085C15.8434 2.00948 12.8266 2.5652 10.9939 4.70783Z" fill="white"/>
              </svg>
              </button>
              <h3 class="recipe-card-title">${recipe.title}</h3>
              <p class="recipe-card-descr">${recipe.description}</p>
              <div>
                <p class="recipe-card-rating">${recipe.rating}</p>
                <button class="see-recipe-button" type="button">See recipe</button>
              </div>
            </li>
          `;
    });

    // Додавання згенерованих карток до списку
    recipeList.innerHTML = recipeCards.join('');

    // Додаємо обробник подій до кнопок "on-favorite-button" (видалення зі списку)
    const onFavoriteButtons =
      document.getElementsByClassName('on-favorite-button');
    for (const button of onFavoriteButtons) {
      button.addEventListener('click', handleOnFavoriteButtonClick);
    }
  }

  // Функція для видалення рецепту зі списку улюблених
  function handleOnFavoriteButtonClick(event) {
    const recipeId = event.target.dataset.recipeId;
    favoriteRecipes = favoriteRecipes.filter(recipe => recipe._id !== recipeId);
    // Збереження оновленого списку улюблених рецептів у локальне сховище
    localStorage.setItem('selectedRecipes', JSON.stringify(favoriteRecipes));
    // Оновлення списку рецептів після видалення
    updateRecipeList();
  }

  // Функція для обробки кліку на кнопці "All categories"
  function handleAllCategoriesClick() {
    // Видаляємо клас "active" у всіх кнопок фільтрування
    const categoryFilterButtons = document.getElementsByClassName(
      'category-filter-button'
    );
    for (const button of categoryFilterButtons) {
      button.classList.remove('active');
    }

    // Оновлюємо список рецептів без фільтрування
    updateRecipeList();
  }

  // Функція для відмалювання кнопок фільтрів
  function renderCategoryFilters() {
    // Додаємо кнопку "All categories"
    const allCategoriesButton = document.createElement('button');
    allCategoriesButton.classList.add('category-filter-button');
    allCategoriesButton.textContent = 'All categories';
    allCategoriesButton.addEventListener('click', handleAllCategoriesClick);
    categoryFilterContainer.appendChild(allCategoriesButton);

    // Додаємо інші кнопки фільтрів
    const filtersHTML = uniqueCategories
      .map(
        category => `
          <button class="category-filter-button" data-category="${category}">${category}</button>
        `
      )
      .join('');

    categoryFilterContainer.innerHTML += filtersHTML;
  }

  // Виклик функції для відмалювання початкових кнопок фільтрів
  renderCategoryFilters();

  // Обробник події при кліку на кнопку фільтру
  function handleCategoryFilterClick(event) {
    // Видаляємо клас "active" у всіх кнопок фільтрування
    const categoryFilterButtons = document.getElementsByClassName(
      'category-filter-button'
    );
    for (const button of categoryFilterButtons) {
      button.classList.remove('active');
    }

    // Додаємо клас "active" до клікнутої кнопки фільтрування
    const selectedCategory = event.target.dataset.category;
    event.target.classList.add('active');

    // Оновлюємо список рецептів з урахуванням фільтру
    updateRecipeList(selectedCategory);
  }

  // Додаємо обробник подій до кожної кнопки фільтрування
  const categoryFilterButtons = document.getElementsByClassName(
    'category-filter-button'
  );
  for (const button of categoryFilterButtons) {
    button.addEventListener('click', handleCategoryFilterClick);
  }

  // Виклик функції для оновлення списку рецептів (при завантаженні сторінки)
  updateRecipeList();
}

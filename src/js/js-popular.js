const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
const ulPopEl = document.querySelector('.pop-list');
fetchPopItem().then(data => {
  ulPopEl.innerHTML = makePopMarckap(data);
  ulPopEl.addEventListener('click', evt => {
    const popImgLink = evt.target.closest('.pop-img-link');
    if (!popImgLink) {
      return;
    }
    const seeRecipe = popImgLink.querySelectorAll('.recipe_desc_btn');
    onClickRecipeDescrBtn();
  
    function onClickRecipeDescrBtn() {
      const popUpRecipe = document.querySelector('.pop-up-recipe');
      const backdropPopupRecipe = document.querySelector(
        '.backdrop-popup-recipe'
      );
  
      popUpRecipe.style.display = 'block';
      backdropPopupRecipe.style.display = 'block';
    }
  
})
});
function fetchPopItem() {
  return fetch(BASE_URL + 'recipes/popular').then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
function makePopMarckap(arr) {
  return arr
    .map(
      c =>
        `<li class="pop-item">
          <button value="${c._id}" class="pop-img-link">
            <img class="pop-img" src="${c.preview}" alt="a">
          <div class="pop-info">
            <h3>${c.title}</h3>
            <p>${c.description}</p>
          </div>
          </button>
          </li>`
    )
    .join('');
}

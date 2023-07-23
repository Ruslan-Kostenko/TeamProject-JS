const catBtnEl = document.querySelector('.cat-btn');
const ulCatEl = document.querySelector('.cat-list');
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
const UlCardEl =document.querySelector('.card_list')
fetchCatItem().then(data => {
  ulCatEl.innerHTML = makeCatItem(data);
});
function fetchCatItem() {
  return fetch(BASE_URL + 'categories').then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
fetchAllRecept().then(data=>{
  UlCardEl.innerHTML = makeCardMark(data);
})


function makeCatItem(arr) {
  return arr
    .map(
      b =>
        `<li class="cat-item"><button class="cat-opt" value="${b._id}">${b.name}</button></li>`
    )
    .join('');
};

function makeCardMark(info){
  
  return info.results.map((g)=>
` <li class="card_item">
<img src="${g.thumb}" alt="${g.title}" class="card_img" />
<button class="card_fav">
  <svg class="card_heart">
    <use href="./images/icons/heart.svg#icon-heart"></use>
  </svg>
</button>
<div class="recipe_desc">
  <h3 class="recipe_desc_title">${g.title}</h3>
  <p class="recipe_desc_overview">
  ${g.description}
  </p>
  <div class="card_info">
    <p class="card_rating">Rating placeholder</p>
    <button class="recipe_desc_btn">See recipe</button>
  </div>
</div>
</li>`
).join('');
}
function fetchAllRecept() {
  return fetch(BASE_URL + 'recipes?limit=9').then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function addActive(a){
   return a.classList.add('isActive');
}
function fetchReceptByCategory(catName){
  return fetch(`${BASE_URL}recipes?limit=9&category=${catName}`).then(resp=>{
    if(!resp.ok){
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
ulCatEl.addEventListener('click',(event)=>{
  if (!event.target.classList.contains('cat-opt')) {
    return;
  }
  const catName= event.target.textContent;
  fetchReceptByCategory(catName).then(data=>{
    UlCardEl.innerHTML = makeCardMark(data);
  });
});

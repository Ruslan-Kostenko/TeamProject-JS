
const catBtnEl= document.querySelector('cat-btn')
const ulCatEl = document.querySelector('.cat-list');
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';


fetchCatItem().then((data) => {
    ulCatEl.innerHTML = makeCatItem(data);
  });
  function fetchCatItem() {
    return fetch(BASE_URL + 'categories')
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      });
  };
  function makeCatItem(arr) {
    return arr.map((b) => `<li class="cat-item"><button class="cat-opt" value="${b._id}">${b.name}</button></li>`)
      .join('');
  };
  function getAllRecept(){
    return fetch(BASE_URL + 'recipes')
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      });
  };

  catBtnEl.addEventListener('click')
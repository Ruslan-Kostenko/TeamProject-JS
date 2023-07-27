const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
const ulPopEl = document.querySelector('.pop-list');
fetchPopItem().then(data => {
  ulPopEl.innerHTML = makePopMarckap(data);
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
          <a href="#" class="pop-img-link">
            <img class="pop-img" src="${c.preview}" alt="a">
          </a>
          
          <div class="pop-info">
            <h3>${c.title}</h3>
            <p>${c.description}</p>
          </div>`
    )
    .join('');
}

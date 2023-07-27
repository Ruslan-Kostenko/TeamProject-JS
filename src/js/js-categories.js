const catBtnEl = document.querySelector('.cat-btn');
const ulCatEl = document.querySelector('.cat-list');
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
const UlCardEl =document.querySelector('.card_list');
const catOptEl= document.querySelector('.cat-opt');
const searchInput = document.querySelector('.search_input')
const time = document.querySelector('.time_select')

const area = document.querySelector('.area_select') 

const ingredients = document.querySelector('.ingredients_select') 




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



let lastClickedBtn = null;
ulCatEl.addEventListener('click',(event)=>{
  if (!event.target.classList.contains('cat-opt')) {
    return;
  }if (lastClickedBtn) {
    lastClickedBtn.classList.remove('is-active');
  }
  // searchInput.value = '';
  // time.selectedIndex = 0;
  // area.selectedIndex = 0;
  // ingredients.selectedIndex = 0;
  catBtnEl.classList.remove('is-active');
  event.target.classList.add('is-active');
  lastClickedBtn = event.target;
  const catName= event.target.textContent;
  currentPage = 1;
  fetchReceptByCategory(catName,currentPage,setLimit).then(data=>{
     UlCardEl.innerHTML = makeCardMark(data);
     UlCardEl.addEventListener('click', event => {
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
    return data.totalPages
  }).then(data=>{
    paginListEl.innerHTML = '';
    creatPaginMarkup(data)
  })
});





fetchCatItem().then(data => {
  ulCatEl.innerHTML = makeCatItem(data);
}).catch(error=>{
  console.error("Произошла ошибка:", error);
});

fetchAllRecept(currentPage,setLimit).then(data=>{
  UlCardEl.innerHTML = makeCardMark(data);
  UlCardEl.addEventListener('click', event => {
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
  return data.totalPages})
  .then(data=>{
    paginListEl.innerHTML = '';
    creatPaginMarkup(data)
  }).catch(error=>{
  console.error("Произошла ошибка:", error);
})



function removeAllActive(){
 const allCatOptEl = document.querySelectorAll('.cat-opt');
 allCatOptEl.forEach(catOpt=>{
  catOpt.classList.remove('is-active');
  
 });

}
function addActive(a){
  return a.classList.add('isActive');
}
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
`<li class="card_item">
<img src="${g.thumb}" alt="${g.title}" class="card_img" />
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
  <h3 class="recipe_desc_title">${g.title}</h3>
  <p class="recipe_desc_overview">
  ${g.description}
  </p>
  <div class="card_info">
    <p class="card_rating">Rating: ${g.rating}</p>
    <button value=${g._id} class="recipe_desc_btn">See recipe</button>
  </div>
</div>
</li>`
).join('');
}

function fetchCatItem() {
  return fetch(BASE_URL + 'categories').then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
function fetchAllRecept(page,limit) {
  return fetch(`${BASE_URL}recipes?page=${page}&limit=${limit}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function fetchReceptByCategory(catName,currentPage,setLimit){
  return fetch(`${BASE_URL}recipes?page=${currentPage}&limit=${setLimit}&category=${catName}`).then(resp=>{

    if(!resp.ok){
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}





catBtnEl.addEventListener('click',(evt)=>{
  searchInput.value = '';
  time.selectedIndex = 0;
  area.selectedIndex = 0;
  ingredients.selectedIndex = 0;
  fetchAllRecept(currentPage,setLimit).then(data=>{
    removeAllActive();
    searchInput.value = '';
    catBtnEl.classList.add('is-active');
    UlCardEl.innerHTML = makeCardMark(data);
    UlCardEl.addEventListener('click', event => {
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
    return data.totalPages
  }).then(data=>{
    paginListEl.innerHTML = '';
    creatPaginMarkup(data)
  })
  
}
)










  const paginListEl = document.querySelector('.pagination__list');


  // function getTotalPages(currentPage,setLimit){
  // return fetchAllRecept(currentPage,setLimit).then(data=>{
  //   return data.totalPages;
    
  // })
// }
// getTotalPages(currentPage,setLimit).then(data=>{
//   creatPaginMarkup(data);
// })
  function creatPaginMarkup(totalPages){
      for (let i = 0; i < totalPages; i+1){
          const paginItem = displayPaginationBtn(i+=1);
          paginListEl.appendChild(paginItem);
      }
  }

  function displayPaginationBtn(page){    
      const paginItemEl = document.createElement('li');
      paginItemEl.classList.add('pagination__item');
      paginItemEl.innerText = page;
      return paginItemEl;
  }

  

paginListEl.addEventListener('click',(evt)=>{
  if (!evt.target.classList.contains('pagination__item')) {
    return;
  }if (lastClickedBtn) {
    lastClickedBtn.classList.remove('activated');
  }
  // searchInput.value = '';
  // time.selectedIndex = 0;
  // area.selectedIndex = 0;
  // ingredients.selectedIndex = 0;
  catBtnEl.classList.remove('activated');
  evt.target.classList.add('activated');
  lastClickedBtn = evt.target;
  
  currentPage = evt.target.textContent;
  const hasActiveLi = ulCatEl.querySelector('.cat-opt.is-active');
  if(hasActiveLi){
    let catName = hasActiveLi.textContent;
    fetchReceptByCategory(catName,currentPage,setLimit).then(data=>{
      UlCardEl.innerHTML = makeCardMark(data)})
  }else{
  fetchAllRecept(currentPage,setLimit).then(data=>{
    UlCardEl.innerHTML = makeCardMark(data);
    
  }).catch(error=>{
    console.error("Произошла ошибка:", error);
  
  });
}
})
upPaginEl.addEventListener('click', evt=>{
  currentPage = parseInt(currentPage) + 1;
  console.log(currentPage)
  const activePages = document.querySelectorAll('.pagination__item')
  const activetedPage =document.querySelector('.activated');
  activePages.forEach(activePage=>{
    if(activetedPage){
      activetedPage.classList.remove('activated');
    }
    if(activePage.textContent == currentPage){
      
      activePage.classList.add('activated');
    }
  })
  const hasActiveLi = ulCatEl.querySelector('.cat-opt.is-active');
  if(hasActiveLi){
    let catName = hasActiveLi.textContent;
    fetchReceptByCategory(catName,currentPage,setLimit).then(data=>{
      UlCardEl.innerHTML = makeCardMark(data)})
  }else{
  fetchAllRecept(currentPage,setLimit).then(data=>{
    UlCardEl.innerHTML = makeCardMark(data);
    
  }).catch(error=>{
    console.error("Произошла ошибка:", error);
  
  });
}
})




downPaginEl.addEventListener('click', evt=>{
  currentPage = parseInt(currentPage) - 1;
  console.log(currentPage)
  const activePages = document.querySelectorAll('.pagination__item')
  const activetedPage =document.querySelector('.activated');
  activePages.forEach(activePage=>{
    if(activetedPage){
      activetedPage.classList.remove('activated');
    }
    if(activePage.textContent == currentPage){
      
      activePage.classList.add('activated');
    }
  })
  const hasActiveLi = ulCatEl.querySelector('.cat-opt.is-active');
  if(hasActiveLi){
    let catName = hasActiveLi.textContent;
    fetchReceptByCategory(catName,currentPage,setLimit).then(data=>{
      UlCardEl.innerHTML = makeCardMark(data)})
  }else{
  fetchAllRecept(currentPage,setLimit).then(data=>{
    UlCardEl.innerHTML = makeCardMark(data);
    
  }).catch(error=>{
    console.error("Произошла ошибка:", error);
  
  });
}
})

doublUpEl.addEventListener('click',evt=>{
 const activePages = document.querySelectorAll('.pagination__item')
  const activetedPage =document.querySelector('.activated');
  activePages.forEach(activePage=>{
    if(activetedPage){
      activetedPage.classList.remove('activated');
    }
    if(activePage.textContent == currentPage){
      
      activePage.classList.add('activated');
    }
  })
  currentPage = activePages.length;
  const hasActiveLi = ulCatEl.querySelector('.cat-opt.is-active');
  if(hasActiveLi){
    let catName = hasActiveLi.textContent;
    fetchReceptByCategory(catName,currentPage,setLimit).then(data=>{
      UlCardEl.innerHTML = makeCardMark(data)})
  }else{
  fetchAllRecept(currentPage,setLimit).then(data=>{
    UlCardEl.innerHTML = makeCardMark(data);
    
  }).catch(error=>{
    console.error("Произошла ошибка:", error);
  
  });
}
})

doublDownEl.addEventListener('click',evt=>{
  const activePages = document.querySelectorAll('.pagination__item')
   const activetedPage =document.querySelector('.activated');
   activePages.forEach(activePage=>{
     if(activetedPage){
       activetedPage.classList.remove('activated');
     }
     if(activePage.textContent == currentPage){
       
       activePage.classList.add('activated');
     }
   })
   
   const hasActiveLi = ulCatEl.querySelector('.cat-opt.is-active');
   if(hasActiveLi){
     let catName = hasActiveLi.textContent;
     fetchReceptByCategory(catName,currentPage,setLimit).then(data=>{
       UlCardEl.innerHTML = makeCardMark(data)})
   }else{
   fetchAllRecept(currentPage,setLimit).then(data=>{
     UlCardEl.innerHTML = makeCardMark(data);
     
   }).catch(error=>{
     console.error("Произошла ошибка:", error);
   
   });
 }
 })
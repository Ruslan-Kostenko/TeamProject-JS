import { refs } from './js-refs';


if (refs.openButtonHeroEl) {
  refs.openButtonHeroEl.addEventListener('click', onModalOpen);
}

refs.openButtonEl.addEventListener('click', onModalOpen);

refs.closeButtonEl.addEventListener('click', onModalRemove);

refs.backdropEl.addEventListener('click', onBackdropClick);

refs.modalOrderNowForm.addEventListener('submit', onSubmitForm);

function onModalOpen() {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal-order-now');
}

function onModalRemove() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal-order-now');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onModalRemove();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onModalRemove();
  }
}

async function onSubmitForm(e) {
  e.preventDefault();

  const formData = extractFormData(refs.modalOrderNowForm);
  console.log(formData);

  onModalRemove();
  refs.modalOrderNowForm.reset();

  try {
    const response = await fetch('https://tasty-treats-backend.p.goit.global/api/orders/add', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Дані успішно відправлені на бекенд:', data.message);
  } catch (error) {
    console.error('Помилка при відправленні даних на бекенд:', error);
  }
}


function extractFormData(form) {
  let formData = {};

  formData.name = form.querySelector('input[name="name"]').value;
  formData.phone = form.querySelector('input[name="phone"]').value;
  formData.email = form.querySelector('input[name="email"]').value;
  formData.comment = form.querySelector('textarea[name="comment"]').value;

  return formData;
}

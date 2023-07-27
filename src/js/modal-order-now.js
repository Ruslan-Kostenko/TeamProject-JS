import { refs } from './js-refs';

console.log(refs.modalOrderNowForm.elements);

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

// function extractFormData(form) {
//   let formData = {};
//   const inputsEl = form.elements;

//   formData.name = inputsEl.name.value;
//   formData.phone = inputsEl.phone.value;
//   formData.email = inputsEl.email.value;
//   formData.comment = inputsEl.comment.value;

//   return formData;
// }

// function onSubmitForm(e) {
//   e.preventDefault();

//   const formData = extractFormData(refs.modalOrderNowForm);
//   console.log(formData);

//   refs.modalOrderNowForm.reset();
// }

function onSubmitForm(e) {
  e.preventDefault();

  const formData = extractFormData(refs.modalOrderNowForm);
  console.log(formData);

  refs.modalOrderNowForm.reset();
}

function extractFormData(form) {
  let formData = {};

  formData.name = form.querySelector('input[name="name"]').value;
  formData.phone = form.querySelector('input[name="phone"]').value;
  formData.email = form.querySelector('input[name="email"]').value;
  formData.comment = form.querySelector('textarea[name="comment"]').value;

  return formData;
}

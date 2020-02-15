const toggle = document.querySelector('#toggle');
const close = document.querySelector('#close');
const open = document.querySelector('#open');
const modal = document.querySelector('#modal');

function toggleNav() {
  document.body.classList.toggle('show-nav');
}

function showModal() {
  modal.classList.add('show-modal');
}

function closeModal() {
  modal.classList.remove('show-modal');
}

toggle.addEventListener('click', toggleNav);
open.addEventListener('click', showModal);
close.addEventListener('click', closeModal);
window.addEventListener('click', e =>
  e.target === modal ? modal.classList.remove('show-modal') : false
);

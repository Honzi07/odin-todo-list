import './scss/style.scss';
import './scss/reset.scss';

const menuBtn = document.querySelector('.btn-menu');
const asideEL = document.querySelector('aside');
const mainEL = document.querySelector('main');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  asideEL.classList.toggle('active');
  mainEL.classList.toggle('active');
});

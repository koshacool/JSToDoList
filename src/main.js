import modalController from './modal';

import './styles/index.scss';


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('open-modal').addEventListener('click', modalController.open);
});


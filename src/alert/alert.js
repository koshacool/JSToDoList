import { alertTypes, alertClasses, defaultShowingDuration } from './constants';

import './style.scss';


class Alert {
  constructor () {
    this.init();

    this.showError = this.showError.bind(this);
    this.hideMessage = this.hideMessage.bind(this);
    this.createMessageElement = this.createMessageElement.bind(this);
  }

  init () {
    const $mountPoint = document.getElementById('app');
    const $alertBlock = document.createElement('div');

    $alertBlock.className = 'alert-container';
    $alertBlock.id = 'alert-container';

    $mountPoint.appendChild($alertBlock);

    this.$mainBlock = document.getElementById('alert-container');
  }

  showError ({ message }, duration = defaultShowingDuration) {
    const $element = this.createMessageElement(alertTypes.error, message);
    this.$mainBlock.appendChild($element);


    setTimeout(this.hideMessage($element), duration);
  }

  showSuccess (message, duration = defaultShowingDuration) {
    const $element = this.createMessageElement(alertTypes.success, message);
    this.$mainBlock.appendChild($element);

    setTimeout(this.hideMessage($element), duration);
  }

  hideMessage ($element) {
    return () => this.$mainBlock.removeChild($element);
  }

  createMessageElement (type, message) {
    const $messageBlock = document.createElement('div');

    $messageBlock.className = `${alertClasses[type]} alert-container__message`;
    $messageBlock.innerHTML = message;

    return $messageBlock;
  }
}

const alertService = new Alert();

export default alertService;
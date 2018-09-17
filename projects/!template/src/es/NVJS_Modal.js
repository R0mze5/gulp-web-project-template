'use strict';

function NVJSModal(config, ...configAtributes) {
  const self = this;
  
	let autoInitialize = true;
  let logErrors = false;
  let lockBody = true;
  let closingElements = [];
  let preventedElements = [];

  let _initialized = false;
  let _isShow = false;
  let _bodyFlowStatus;
  
  //this.modal;
  //this.buttons

  let buttons;

  let modalShowClass = 'open'; //className showed modal


  let modalBody;
  let modalBodyClass;
	let modalBodyDefaults = '.modal__container'; //modal mainContainer for stopPropagination

	let modalCloseButton; //buttons for close modal
	let modalCloseButtonClass; //buttons for close modal
	let modalCloseButtonDefaults = '.modal__close'; //buttons for close modal



	function parseDataModal(configData) {
    if(document.querySelector(this)){
      self.modal = document.querySelector(this);
    }

    if(configData){
      buttons = configData.callButtons;

      modalBodyClass = configData.modalBody ? configData.modalBody : modalBodyDefaults;
      modalCloseButtonClass = configData.modalCloseButton ? configData.modalCloseButton : modalCloseButtonDefaults;
      modalCloseButton = self.modal.querySelector(modalCloseButtonClass);

      modalShowClass = configData.modalShowClass ? configData.modalShowClass : modalShowClass;
      logErrors = configData.logErrors ? configData.logErrors : logErrors;
      lockBody = configData.lockBody ? configData.lockBody : lockBody;
      autoInitialize = configData.autoInitialize ? configData.autoInitialize : autoInitialize;

      buttons = configData.modalShowButtons;
    }

		if(autoInitialize) initialize();
	}



  
  function initialize(){
    
    if (buttons){
      self.buttons = parseButtonsArray(buttons);
    }

    closingElements.push(modalCloseButton);

    if (self.modal.querySelector(modalBodyClass)){
      modalBody = self.modal.querySelector(modalBodyClass);
      preventedElements.push(modalBody);
      closingElements.push(self.modal);
    } else if (Array.prototype.slice.call(document.querySelectorAll(modalBodyClass), 0).some(element => element == self.modal)){
      preventedElements.push(self.modal);
      closingElements.push(document.body);
    }

    setEvents();
  }



	function setEvents(){

    preventedElements.forEach(element => element.addEventListener('click', (event) => {
        event.cancelBubble = true;
    }));

    if(closingElements){
      self.modal.addEventListener('show', () => {
        closingElements.forEach(element => element.addEventListener('click', hide));

        // привязать скрытие модалки только для одного элемента за раз
        // document.addEventListener('keyup', elementOnKeyPressHandler);
      });
      self.modal.addEventListener('hide', () => {
        closingElements.forEach(element => element.removeEventListener('click', hide));
      });
    }


    if(self.buttons){
      self.buttons.forEach(button => {
          button.addEventListener('click', (event) => {
          event.preventDefault();
          self.show();
        });
      });
    }

    function elementOnKeyPressHandler(event){
      if(event.key == "Escape"){
        hide();
        document.removeEventListener('keyup', elementOnKeyPressHandler);
      }
    }

	}


	function show() {
    activeClassHandler.call(self.modal, 'add', modalShowClass);
    bodyLock.call(self.body, 'lock');
		self.modal.dispatchEvent(new Event ('show'));
		_isShowInverse();
    
	}

	function hide() {
    bodyLock.call(self.body, 'unlock');
    activeClassHandler.call(self.modal, 'remove', modalShowClass);
		self.modal.dispatchEvent(new Event ('hide'));
		_isShowInverse();
  }

  function bodyLock(status){
    if(lockBody) {
      if (status == 'lock'){
        _bodyFlowStatus = document.body.style.overflow;  
        document.body.style.overflow = 'hidden';
      } else if (status == 'unlock'){
        document.body.style.overflow = _bodyFlowStatus;
        _bodyFlowStatus = undefined;
      }
    }
  }
  

  function parseButtonsArray(buttonsArray){
    let allbuttonsArray = [];
    if(typeof buttonsArray == 'object'){
      buttonsArray.map(element => {
        parseButtonsArray(element).forEach(element => allbuttonsArray.push(element));
      });
      return allbuttonsArray;

    } else if(typeof buttonsArray == 'string'){
      return Array.prototype.slice.call(document.querySelectorAll(buttonsArray), 0);
    }
  }

  function activeClassHandler(action, className){
    // написать более простой обработчик проверки налличия класса
    if (action == 'add'){
      if(!this.classList.contains(className)){
        this.classList[action](className);
      }
    } else if (action == 'remove'){
      if(this.classList.contains(className)){
        this.classList[action](className);
      }
    }
  }

	function _isShowInverse() {
		_isShow = !_isShow;
	}


	this.toggle = () => {
		!_isShow ? show() : hide();
	};

  this.hide = function(){
    if(_isShow){
      hide();
    }
  };


  this.show = function(){
    if(!_isShow){
      show();
    }
  };

  this.initialize = function(){
    if(!_initialized){
      initialize();
    }
  };

	function parseConfig() {
		switch(typeof config){
      case 'string': {
        if (document.body.querySelectorAll(config)){
          let modals = document.body.querySelectorAll(config);
          if (modals.length == 1){
            if (configAtributes.length == 1 && configAtributes[0] instanceof Object){
              parseDataModal.call(config, configAtributes[0]);
            } else {
              showError('configuration is not object');
            }
          } else if(modals.length > 1){
            //! обработчик, если доступно модалок по селектору больше одной
          }
        } else {
          showError(`${config} not found on this page`);
        }
        break;
      }
      case 'object': {
        if(config instanceof Array){
          // parseData align on button or modal
        } else {
          // parseData align on button or modal
        }
        break;
      }
      case 'undefined': {
          showError(`no data to configurate modal`);
          break;
      }
    }
  }
  
  function showError(textError) {
    if (logErrors){
      throw new Error(textError);
    }
  }

	parseConfig();
}


// let modal = new NVJSModal('.modal[data-call="agreement_modal"]', {
//   modalShowClass: 'open',
//   modalShowButtons: ['.agreement__link', '.confidential__link'],
// 	modalBody: '.modal__container',
// 	modalCloseButton: '.modal__close'
// });
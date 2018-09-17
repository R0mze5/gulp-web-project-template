'use strict';

// добавить функцию проверки символов при вводе номера


function NJVSForm(config, ...configAtributes){
  const self = this;

  
  this.form = document.querySelector(config);

  this.form.addEventListener('submit', (e) => {
    e.preventDefault();

    let agreement = self.form.querySelector('.agreement input');
    if (agreement.checked){
      this.form.dispatchEvent(new Event('sended'));

      // отправка события после проверки
    } else {

      setError.call(agreement)

    }
  })

  function setError(){
    this.parentNode.classList.add('error');
    this.addEventListener('change', removeError.bind(this))
  }

  function removeError(){
    this.parentNode.classList.remove('error');
    this.removeEventListener('change', removeError.bind(this))
  }


  this.a  = function(){
    console.log(3)
  }




  function validateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this).toLowerCase());
  }

  function validateTel() {
    var re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      return re.test(String(this).toLowerCase());
  }

  function validateText() {
    var re = /[a-zA-Zа-яёА-ЯЁ]{1,}/;
      return re.test(String(this).toLowerCase());
  }

}

// function FormSender(config) {
//   let form = undefined; //data to find buttons
//   let sendButtonTag = '.send_btn';
//   let sendButton;
//   let fields;


//   let cardsContainer = _$('.cards__container');
//   let ticket = _$('.ticket');
//   let registration = _$('.registration');
//   let cards = _$$('.cards__block');

//   /*_$('.cards__block').addEventListener('change', function() {
//     console.log(_$('#cardsValue'))
//   })*/

//   const self = this;

//   this.initialize = function() {
//       let formTag;

//       if (typeof(config) == 'string'){
//         formTag = config;
//       } else if (typeof(config) == 'object') {
//         formTag = config.form;
//       }
//       form = document.querySelector(formTag)

//       if (form!==null && form!==undefined && typeof(config) == 'object') {
//         configurate();
//         /*hiddenEvent();*/


//       } else {
//         return false;
//       }
//   }

//   function configurate(){
//       sendButton = config.sendButton || sendButtonTag;
//       sendButton = _$(sendButton);
//       sendButton.onclick = self.sendForm.bind(this, event)

//       fields = document.querySelector('.fields');

//       setEvents();
//   }

//   this.configurate = configurate;

//   function error(type){
//     const undefine = 'main tag of modal is error or undefined'
//     if (type === 'undefined'){
//       /*console.error(undefine);*/
//     }
//   }

//   function _$(tag){
//     let result = document.querySelector(tag);
//     if (result!==null && result!==undefined) {

//       return result
//     } else {

//       return false
//     }
//   }

//   function _$$(tag){
//     return Array.prototype.slice.call(document.querySelectorAll(tag), 0 )
//   }




//   function clearRegistration() {
//     let registrationContainer = _$$('.registration__container');
//     registrationContainer.forEach( function(element, index) {
//       let contains = false;
//       (element.childNodes.forEach(function(element){
//         if(element.className == 'registration__agreement'){
//           contains = true;
//         }
//       }))
//       if (!contains){
//         element.parentNode.removeChild(element)
//       }
//     });
//   }

//   function appendRegistration(name, count, sum) {
//     let registrationContainerInner = `
//                                       <div class="registration__event">
//                                           1
//                                       </div>
//                                       <div class="registration__num">
//                                           2
//                                       </div>
//                                       <div class="registration__sum">
//                                           3
//                                       </div>
//                                 `;


//       let registrationContainer = document.createElement('div');
//       registrationContainer.className = ('registration__container');
//       registrationContainer.innerHTML = registrationContainerInner;


//       let registrationName = registrationContainer.querySelector('.registration__event')
//       let registrationCount = registrationContainer.querySelector('.registration__num')
//       let registrationSum = registrationContainer.querySelector('.registration__sum')

//       registrationName.innerText = name;
//       registrationCount.innerText = count;
//       registrationSum.innerText = sum;
//       return registrationContainer;
//   }

//   function ticketsSumTotal() {
//     let totalSum = 0;

//     let values = _$('#cardsValue').value.split(',')
//     values.forEach( function(element) {
//       let card;
//       cards.forEach(function(elem){
//         if (elem.getAttribute('data-value') === element){
//           card = elem;
//         }
//       })
//       let price = card.getAttribute('data-price');
//       let count = card.getAttribute('data-count');

//       totalSum = totalSum + price*count

//     });
//     registration.querySelector('.registration__sum.total').innerText = totalSum + ' РУБ';
//   }


//   this.sendForm = function() {
//     let data = {};

//     data.solutions = self.getEvents();
//     /*element.classList.add('error')*/

//     if(checkInputs()){
//       fields.querySelectorAll('input').forEach(function(element){
//         data[element.name] = element.value
//       })
//     } else {
//       event.preventDefault();
//     }

//     data.suggestion = _$('#email_suggestion').checked


//     if(checkAgreement()){
//       console.log(data)
//       /* ************************************** */
//       /* **************Сергей****************** */
//       /* вот здесь уже консолидированные данные */
//       /* ************************************** */
//       /* ************************************** */

//     } else {
//       event.preventDefault();
//     }
//   }

//   this.getEvents = function() {
//     let event = {};
//     let values = _$('#cardsValue').value.split(',')
//     values.forEach( function(element) {
//       let card;
//       cards.forEach(function(elem){
//         if (elem.getAttribute('data-value') === element){
//           card = elem;
//         }
//       })
//       //let price = card.getAttribute('data-price');
//       let count = card.getAttribute('data-count');
//       /*let name = card.querySelector('.cards__block__title').innerText;*/
//       let name = card.getAttribute('data-value');
//       event[name] = count;
//     });
//     return event
//   }


//   let validationComposer = function(rule){
//     return 'validate' + rule.slice(0, 1).toUpperCase()  + rule.slice(1);
//   }

//   function checkInputs(){
//     let checked = false;
//      fields.querySelectorAll('input').forEach(function(element){
//       element.onkeydown = function(event) {
//         if(element.classList.contains('error')){element.classList.remove('error')}
//       }

//       let rule;

//       if (element.hasAttribute('data-required')){
//         rule = element.getAttribute('data-type')
//         let validationFunctionName = validationComposer(rule)
//         let valid = window[validationFunctionName].call(element.value)

//         if(!valid){
//           element.classList.add('error')
//         } else {
//           checked = true;
//         }
//       }
//     })
//      return checked;
//   }

//   function checkAgreement(){
//     let agreement = _$('#agreement');
//     agreement.onchange = function() {
//       if(agreement.classList.contains('error')){
//         agreement.classList.remove('error')
//       }
//     }

//     if(agreement.checked == false){
//       agreement.classList.add('error');
//     }

//     return agreement.checked;

//   }




//   this.initialize();
// }

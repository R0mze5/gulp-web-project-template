'use strict';




const documentBody = document.querySelector('body');


/* make position absolute for menu on pages in Array */
// createMenu();


// let chainFunction = new Promise((resolve) => {
// 	let cookieAgreement = checkCookieAgreement()
// 	if(cookieAgreement){
// 		cookieAgreement
// 		.then(()=>{
// 			resolve();
// 		});
// 	} else {
// 		resolve();
// 	}
// })
// 	.then(()=>{
// 		addModal();
// 	})
// 	.then(()=>{
// 		//checking form after modal, cause modal can has form for subscribe
// 		addFormCheck();
// 	});



/* add Yandex API maps */
// addMaps();

/* add choices on bitrix page */
// addChoices();

// addFilter();

// addTabs();

/* add tabs on pages */
// addSwiper();







function createMenu(){
	let menu = new NVJSMenu();
}


function addMaps(){
	if(document.getElementById('map')) {
		let promise = createPromise('https://api-maps.yandex.ru/2.1/?lang=ru_RU');
		promise.then(() => {
			ymaps.ready(init);
			var jetmix,
				placemark,
				center;
		
			function init(){ 
				center  = [54.7218, 20.4961];
				jetmix = new ymaps.Map('map', {
					center: center,
					zoom: 15,
					controls: ['zoomControl']
				});
			
				jetmix.behaviors.disable('scrollZoom');
				placemark = new ymaps.Placemark( [54.7218,20.4961], { hintContent: 'Jetmix', balloonContent: 'ул. Генделя 5' },{iconColor: '#9bc53d'});
				jetmix.geoObjects.add(placemark);
			}
		});
	}

}

function addChoices(){
	if(document.querySelector('.bitrix_rates__card__choices')) {
		let choices;
		let promise = createPromise('/local/templates/website/js/vendors/choices.js');
		promise.then(() => {
			choices = new Choices('.bitrix_rates__card__choices');
		});
	}
}

function addTabs(){
	let servicesTab;

	
	if(document.querySelector('.services__filter')) {

		let promise = createPromise('/local/templates/website/js/NVJS_Tabs.js');
		promise.then(() => {
			servicesTab = new NVJSTabs({
				tabButtons: '.services__filter__item',
				ButtonActiveClass: 'active',
				tabBlocks: '.services__filter',
				BlockActiveClass: 'shown',
				container: '.services',
			});
		});
	} else if(document.querySelector('.codestyle')) {
		let promise = createPromise('/local/templates/website/js/NVJS_Tabs.js');
		promise.then(() => {
			servicesTab = new NVJSTabs({
				tabButtons: '.codestyle__header__item',
				ButtonActiveClass: 'active',
				tabBlocks: '.codestyle__area',
				BlockActiveClass: 'shown',
				container: '.codestyle',
			});
		});
	}
	
}

function addSwiper(){
	if(document.querySelector('.swiper-container')) {
		let main_swiper;

		let promise = createPromise('/local/templates/website/js/vendors/swiper.js');
		promise.then(() => {
			if(document.querySelector('.main_swiper__swiper')){
				main_swiper = new Swiper ('.main_swiper__swiper', {
					loop: true,
					effect: 'coverflow',
					/*autoplay: {
					delay: 6500,
					disableOnInteraction: false,
				},*/
			
					// Navigation arrows
					navigation: {
						nextEl: '.main_swiper__navigate__forward--next',
						prevEl: '.main_swiper__navigate__forward--prev',
					}
				});
			} else if(document.querySelector('.blog__swiper')){
				main_swiper = new Swiper ('.blog__swiper', {
					loop: true,
					autoplay: {
						delay: 6500,
						disableOnInteraction: false,
					},
			
					// Navigation arrows
					navigation: {
						nextEl: '.blog__swiper__next',
						//prevEl: '.blog__swiper__next',
					}
				});
			} else if(document.querySelector('.about_swiper__swiper')){
				main_swiper = new Swiper ('.about_swiper__swiper', {
					loop: true,
					slidesPerView: 5,
					centeredSlides: true,
					spaceBetween: 10,
					// Responsive breakpoints
					breakpoints: {
					// when window width is <= 768px
						768: {
							slidesPerView: 1,
							spaceBetween: 10
						},
						// when window width is <= 1200px
						1200: {
							slidesPerView: 3,
							spaceBetween: 20
						}
					}
					/*autoplay: {
					delay: 6500,
					disableOnInteraction: false,
				},*/
				});
			}
		});
	}
}

function addFilter(){
	if(document.querySelector('.cases')) {
		let casesFilter;
		let promise = createPromise('/local/templates/website/js/NVJS_Filter.js');
		promise.then(() => {
			casesFilter = new NVJSFilter({
				filterButtons: '.cases__header__item',
				filterButtonActiveClass: 'active',
				filterBlocks: '.cases__container',
				filterBlockActiveClass: 'hidden',
				container: '.cases',
				autoSetFirstFilter: 'true'
			});
		});
	}
}


function checkCookieAgreement(){
	let promise;
	if(!(localStorage.getItem(window.location.hostname+'_cookieAgreement'))){
		promise = createPromise('/local/templates/website/js/cookieAgreement.js')
		.then(() => {
			showCookieAgreement();
		});
	}
	return promise;
}

function addModal(){

	let subscribeData = localStorage.getItem('Jet-Mix_Subscribe');
	let subscribeDataArray;
	let agreementModalsArray = [];

	if(!subscribeData){
		subscribeDataArray = [];
	} else {
		subscribeDataArray = subscribeData.split(',');
	}


	if ((subscribeDataArray.every(element => {return (element != 'blog')}) && (window.location.pathname.indexOf('blog') != -1) )){
		createSubscribeModal('blog');
	} else if ((subscribeDataArray.every(element => {return (element != 'common')})) && (window.location.pathname.indexOf('blog') == -1) ){
		createSubscribeModal('common');
	}

	function createSubscribeModal(localStorageItem){
		let subscribeModal = new NVJSModal('.modal[data-call="subscribe_modal"]', {
			modalShowClass: 'open',
			modalBody: '.modal__container',
			modalCloseButton: '.modal__close'
		});

		setTimeout(() => {
			subscribeModal.show();
			subscribeDataArray.push(localStorageItem);
			localStorage.setItem('Jet-Mix_Subscribe', subscribeDataArray);
		}, 20000);
	}

	let agreementModal = new NVJSModal('.modal[data-call="agreement_modal"]', {
		modalShowClass: 'open',
		modalShowButtons: '.agreement__link',
		modalBody: '.modal__container',
		modalCloseButton: '.modal__close'
	});
	agreementModal.pathFile = '/local/templates/website/documents/processing_of_personal_data.html';
	agreementModalsArray.push(agreementModal);

	let politicsModal = new NVJSModal('.modal[data-call="politics_modal"]', {
		modalShowClass: 'open',
		modalShowButtons: '.confidential__link',
		modalBody: '.modal__container',
		modalCloseButton: '.modal__close'
	});
	politicsModal.pathFile = '/local/templates/website/documents/privacy_policy.html';
	agreementModalsArray.push(politicsModal);


	

	let cookiesModal = new NVJSModal('.modal[data-call="cookies_modal"]', {
		modalShowClass: 'open',
		modalShowButtons: '.cookies__link',
		modalBody: '.modal__container',
		modalCloseButton: '.modal__close'
	});
	cookiesModal.pathFile = '/local/templates/website/documents/cookie_processing_policy.html';
	agreementModalsArray.push(cookiesModal);



	agreementModalsArray.forEach(modal => {
		modal.isFirstShown = false;

		if(!modal.isFirstShown){
			modal.modal.addEventListener('show', agreementModalsAddContent);

		}

		function agreementModalsAddContent(){
			modal.isFirstShown = true;
			let wrapper = modal.modal.querySelector('.get_call__wrapper');
			let container = document.createElement('div');
			container.className = 'get_call__container';

			loadModalContent(modal.pathFile)
			.then((value) => {
				container.innerHTML = value;
				wrapper.append(container);

			})
			.catch(()=>{
				container.innerText = 'file not found';
				wrapper.append(container);
			});
			modal.modal.removeEventListener('show', agreementModalsAddContent);
		}

	});


	function loadModalContent(url){
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', url);

			xhr.send();

			xhr.addEventListener('load', ()=>{
				if (xhr.status == 404) {
					reject();
				} else {
					resolve(xhr.response)
					//console.log(xhr)
				}
			});
		});
	}
}

function addFormCheck(){
	if(document.querySelector('form')) {
		let forms = {};

		let promise = createPromise('/local/templates/website/js/NVJS_Form.js');
		promise.then(() => {
			Array.prototype.slice.call(document.querySelectorAll('form'), 0).forEach(form => {
				forms[form.className] = new NJVSForm('form.'+form.className);
			});
		});

	}
}




function createPromise(ref){
	return new Promise((resolve) => {
		let addedScript = document.createElement('script');
		addedScript.src = ref;
		addedScript.async = true;
		documentBody.append(addedScript);
		addedScript.onload = function() {
			resolve();
		};
	});
}



/* call function for extend fields on about page */
if (document.querySelector('.about_vacancy')){
	// extendVacancy('.about_vacancy__block', '.about_vacancy__extend');
}

/* function for extend fields on about page */
function extendVacancy(container, button){
	Array.prototype.slice.call(document.querySelectorAll(container), 0).forEach(element => {
		element.addEventListener('click', (event) => {
			extendBlock.call(element, event);
		});
	});

	function extendBlock(event){
		if (event.target == this.querySelector(button)){
			this.classList.add('open');
		}
	}
}
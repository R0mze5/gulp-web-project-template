'use strict';

function NVJSTabs(config, ...configAtributes) {
	const self = this;
	let autoInitialize = true;
	let allowDidabled = false;
	let logErrors = false;
	let autoSetFirstTab = true;

	let container = document;

	let tabButtons;
	let tabButtonsClass;
	let tabButtonsDefaults = '.tab__header';
	let tabButtonsTarget;
	let tabButtonsTargetDefaults = 'data-target';
	let tabButtonActiveClass = 'active';

	// ! добавить возможность перехода по get-запросу
	/* let tabDisbledClass = 'disabled'; */
	/* autotabModule */ //user for generating from array

	
	let tabBlocks;
	let tabBlocksClass;
	let tabBlocksDefaults = '.tab__block';
	let tabBlockTarget;
	let tabBlockTargetDefaults = 'data-name';
	let tabBlockActiveClass = 'shown';




	function parseData(configData) {
		container = configData.container ? document.querySelectorAll(configData.container) : container;

		if(container.length > 1){
			// вызов создания табов для каждого из контейнеров
			container = container[0];
			//*
			if(logErrors){
				throw new Error(`more than 1 container was initialize`);
			}
		} else {
			container = container[0];
		}

		tabButtonsClass = configData.tabButtons || tabButtonsDefaults;
		tabButtons = Array.prototype.slice.call(container.querySelectorAll(tabButtonsClass), 0);
		tabButtonActiveClass = configData.ButtonActiveClass || tabButtonActiveClass;
		tabButtonsTarget = configData.tabButtonsTarget || tabButtonsTargetDefaults;

		tabBlocksClass = configData.tabBlocks || tabBlocksDefaults;
		tabBlocks = Array.prototype.slice.call(container.querySelectorAll(tabBlocksClass), 0);
		tabBlockActiveClass = configData.BlockActiveClass || tabBlockActiveClass;
		tabBlockTarget = configData.tabBlockTarget || tabBlockTargetDefaults;

		autoSetFirstTab = configData.autoSetFirstTab != undefined ? configData.autoSetFirstTab : autoSetFirstTab;
		autoInitialize = configData.autoInitialize != undefined ? configData.autoInitialize : autoInitialize;

		if(autoInitialize) self.initialize();
	}


	this.initialize = function(){
		if (tabButtons.length > 0 && tabBlocks.length > 0){

			tabBlocks.forEach(block => {
				setActiveClass.call(block, tabBlockActiveClass);
				cleanActiveElements.call(tabBlocks);
			});

			let activeButtons = [];

			tabButtons.forEach(button => {
				setActiveClass.call(button, tabButtonActiveClass);
				setButtonEvents.call(button);
				if(button.classList.contains(button.activeClass)){
					activeButtons.push(button);
				}
			});

			if(activeButtons.length == 1){
				setActiveElement.call(activeButtons[0]);
			} else if(activeButtons.length > 1){
				cleanActiveElements.call(tabButtons);
				setActiveElement.call(activeButtons[0]);
				if(logErrors){
					throw new Error(`more than 1 active button was choosed`);
				}
			} else if(activeButtons.length == 0 && autoSetFirstTab){
				setActiveElement.call(tabButtons[0]);
			}

    
		} else {
			throw new Error('can\'t configurate tabs, because tabButtons or tabs not found');
		}
	};


	function setActiveClass(activeClass){
		this.activeClass = activeClass;
	}



	function setButtonEvents() {
		let button = this;
		// * проверка, что только 1 таб подходит
		button.target = container.querySelectorAll(`${tabBlocksClass}[${tabBlockTarget}=${button.getAttribute(tabButtonsTarget)}]`);

		if(button.target.length != 1){
			if(button.target.length < 1){
				button.active = false;

				//добавить запрет на изменение достопности недоступных элементов
				button.unavaliable = true;

				button.style.cursor = 'not-allowed';
				/* button.classList.add(tabDisbledClass); */
				if(logErrors){
					throw new Error(`${button} button unavaliable, because no target tab`);
				}
			} 
		} else if(button.target.length > 1 && logErrors){
			throw new Error(`${button} button has more, than 1 linked tab. Only first will choosed`);
		}

		if(!button.unavaliable){
			button.target = button.target[0];
			button.active = true;

			button.addEventListener('click', activateButtonOnClick.bind(button));
		}
	}

	function activateButtonOnClick(event){
		let button = this;
		event.preventDefault();
		if(!button.classList.contains(button.activeClass) && !allowDidabled){
			cleanActiveElements.call(tabButtons);
			cleanActiveElements.call(tabBlocks);
			setActiveElement.call(button);
		}
	}




	function cleanActiveElements(){
		if ((typeof this == 'object')){
			if(this instanceof Array){
				this.forEach(elem => cleanActiveElements.call(elem));
			}

			if((this instanceof Element) && this.classList.contains(this.activeClass)){
				this.classList.remove(this.activeClass);
			}
		}
	}




	function setActiveElement(){
		// * добавить настройку активации таба через tab.show
		this.classList.add(this.activeClass);
		this.target.classList.add(this.target.activeClass);

		// * создать статическое событие show
		// this.dispatchEvent(new Event ('show'));
		// this.target.dispatchEvent(new Event ('show'));
	}


	/* function setBlockEvents() {
		this.addEventListener('show', (event) => {
			event.preventDefault();
			this.classList.add(this.activeClass);
		});
	} */



	function parseConfig() {
		/* необходимо задать проверку, что радительские тег - не коллекция, а если так, что для каждой коллекции вызвать создание модуля */
		switch(typeof config){
		case 'string': {
			if (container.querySelector(config)){
				if (configAtributes.length < 1){
					parseData({tabButtons: config});
				} else if (configAtributes[0] instanceof Object){
					configAtributes[0].tabButtons = config;
					parseData(configAtributes[0]);
				} else {
					throw new Error('configuration is not object');
				}
			} else {
				throw new Error(`${config} not found on this page`);
			}
		}; 
			break;
		case 'object': {
			if(config instanceof Array){
				config.forEach(element => {
					let tab = new NVJSTabs(element);
				});
			} else {
				parseData(config);
			}
		}
			break;
		// case 'undefined': {
		// 	if (document.querySelector(tabButtonsData)){
		// 		parseData();
		// 	} else if (document.querySelector(tabBlockData)){
		// 		parseData();
		// 	} else {
		// 		throw new Error('can\'t initialize NVJSTabs');
		// 	}
		// }; 
		// 	break;
		// default: {
		// 	throw new Error('type of initialize not defined');
		// };
		}
	}

	parseConfig();
}

// let mainTab

// if(document.querySelector('.cases')){
// 	mainTab = new NVJSTabs({
// 		tabButtons: '.cases__header__item',
// 		ButtonActiveClass: 'active',
// 		tabBlocks: '.cases__container',
// 		BlockActiveClass: 'shown',
// 		container: '.cases'
// 	});
// }
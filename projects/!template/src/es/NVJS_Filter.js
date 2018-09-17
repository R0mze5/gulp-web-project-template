'use strict';

function NVJSFilter(config, ...configAtributes) {
	
	let filterButtons;
	let filterButtonsTargetData = 'data-filter';
	let filterButtonActiveClass = 'active';

	let filterBlocks;
	let filterBlockActiveClass = 'shown';
	let filterBlockTargetData = 'data-tags';

	let container = document.body;

	let autoSetFirstFilter = true;
	let letDisabled = false;
	let letMultipleFilter = false;

	let hideFilteredElements = true //добавть возможность выбора скрытия либо отображения для фильтруемыых элементов

	const self = this;

	this.initialize = () => {
		/* написать парсинг для проверки входящих данных */
		self.configurate(config);
	};


	this.configurate = (configData) => {

		container = configData.container ? document.querySelector(configData.container) : container;

		autoSetFirstFilter = configData.autoSetFirstFilter ? configData.autoSetFirstFilter : autoSetFirstFilter;

		filterButtons = Array.prototype.slice.call(container.querySelectorAll(configData.filterButtons), 0);
		filterButtonActiveClass = configData.filterButtonActiveClass ? configData.filterButtonActiveClass : filterButtonActiveClass;

		filterBlocks = Array.prototype.slice.call(container.querySelectorAll(configData.filterBlocks), 0);
		filterBlockActiveClass = configData.filterBlockActiveClass ? configData.filterBlockActiveClass : filterBlockActiveClass;

		filterBlocks.forEach(block => setTags.call(block, filterBlockTargetData));
		filterButtons.forEach(button => {
			setButtonEvents.call(button);
			setTags.call(button, filterButtonsTargetData)
		});

		if(autoSetFirstFilter){
			setActiveButton.call(filterButtons[0], filterButtons, filterButtonActiveClass);
		}
	};
  
	function setTags(attribute) {
		const elem = this;
		elem.tags = [];
		this.getAttribute(attribute).split(' ').forEach(tag => elem.tags.push(tag));
	}

	function setButtonEvents() {
		let button = this;
		this.addEventListener('click', () => {
			if(!letDisabled && !button.classList.contains(filterButtonActiveClass)){
				setActiveButton.call(button, filterButtons, filterButtonActiveClass);
			}
		})
	}

	function cleanActiveElements(activeClass){

		if ((typeof this == 'object')){
			if(this instanceof Array){
				this.forEach(elem => cleanActiveElements.call(elem, activeClass));
			}

			if((this instanceof Element) && this.classList.contains(activeClass)){
				this.classList.remove(activeClass);
			}
		}
	}

	function setActiveButton(filterButtons, filterButtonActiveClass){
		//продумать и настроить функицию фильтрации через массив фильтров для возможности мультивыбора фильтра + на основе этого добавить возможность использовать нескольго тегов для фильтра
		if(!letMultipleFilter){
			cleanActiveElements.call(filterButtons, filterButtonActiveClass);

			cleanActiveElements.call(filterBlocks, filterBlockActiveClass);

			this.classList.add(filterButtonActiveClass);
			this.tags.forEach(tag => {
				if (tag == 'all'){
					self.showAll();
				} else {
					filterBlocks.forEach(block => {
						if(hideFilteredElements && !block.tags.includes(tag)){
							addClass.call(block, filterBlockActiveClass);
						} else if(!hideFilteredElements && block.tags.includes(tag)){
							removeClass.call(block, filterBlockActiveClass);
						}
					}); 
				}
			});
		}
	}

	this.clearFilter = function(){
		cleanActiveElements.call(filterBlocks, filterBlockActiveClass);
	};

	this.showAll = function(){
		if(hideFilteredElements){
			filterBlocks.forEach(block => removeClass.call(block, filterBlockActiveClass));
		} else{
			filterBlocks.forEach(block => addClass.call(block, filterBlockActiveClass));
		}
	};

	this.initialize();

	function removeClass(activeClass){
		if(this.classList.contains(activeClass)){
			this.classList.remove(activeClass);
		}
	}

	function addClass(activeClass){
		if(!this.classList.contains(activeClass)){
			this.classList.add(activeClass);
		}
	}

}

/* let casesFilter; */

/* if(document.querySelector('.cases')){
	casesFilter = new NVJSFilter({
		filterButtons: '.cases__header__item',
		filterButtonActiveClass: 'active',
		filterBlocks: '.cases__container',
		filterBlockActiveClass: 'shown',
		container: '.cases',
		autoSetFirstFilter: 'true'
	});
} */
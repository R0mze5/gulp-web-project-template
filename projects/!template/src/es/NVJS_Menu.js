'use strict';

function NVJSMenu() {
	//add check lockbodyfunction
	let self = this;
	let header = document.querySelector('.header');
	let hamburger = header.querySelector('.hamburger');
	let menu = header.querySelector('.header__list');
	let body = document.body;
	let toggledElements = [];
	toggledElements.push(header);
	toggledElements.push(hamburger);
	toggledElements.push(menu);
	let lockBody = true;
	
	let _bodyFlowStatus;


	self.hide = () => {hideOpenElements.apply(toggledElements);}
	self.open = () => {showOpenElements.apply(toggledElements);}

	// hideOpenElements.apply(toggledElements);

	function addBodyListener(){
		hideOpenElements.apply(toggledElements);document.body.removeEventListener('click', addBodyListener)
	}
	
	document.body.addEventListener('click', addBodyListener)
	 
	menu.addEventListener('click', e => e.stopPropagation())

	hamburger.addEventListener('click', function(e) {
		e.stopPropagation()
		if (!this.classList.contains('open')){
			showOpenElements.apply(toggledElements);
		} else {
			hideOpenElements.apply(toggledElements);
		}
	})
	
	function showOpenElements(){
		body.addEventListener('click', addBodyListener);

		bodyLock.call(self.body, 'lock');

		this.forEach(element => {
			if(!element.classList.contains('open')) {
				element.classList.add('open')
			}
		});
	}

	function hideOpenElements(){

		bodyLock.call(self.body, 'unlock');

		this.forEach(element => {
			if(element.classList.contains('open')) {
				element.classList.remove('open')
			}
		});
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
}


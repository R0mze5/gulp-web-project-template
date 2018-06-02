'use strict'

window.onload = function(){
	let windowWidth = window.innerWidth;
	let switchWidth = 1200;

	(function reloadOnResize(){
		let startWidth;
		if (window.innerWidth < switchWidth){
		startWidth = true;
		}

		window.addEventListener('resize', function() {
		if ((window.innerWidth < switchWidth && startWidth == true) || (window.innerWidth >= switchWidth && startWidth !== true)){
		} else{
			window.location.reload("true");
		}
		})
	})();





}







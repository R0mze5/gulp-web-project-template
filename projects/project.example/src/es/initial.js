'use strict';


new Promise((resolve) => {
	// someFunc;
})
.then(() => {
	// someFunc;
})
.then(()=>{
	// someFunc;
})




function createPromise(ref){
	return new Promise((resolve) => {
		let addedScript = document.createElement('script');
		addedScript.src = ref;
		addedScript.async = true;
		document.body.append(addedScript);
		addedScript.onload = function() {
			resolve();
		};
	});
}
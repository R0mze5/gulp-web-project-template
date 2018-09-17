// 'use strict';


// function Tabs(config) {
//   this.tabContainer = undefined; //data to find buttons
//   this.switchButton = undefined;
//   let tabSelects;
//   let tabSelectedClass;


//   const self = this;

//   this.initialize = function() {
//       let tabContainerTag;  
//       if (typeof(config) == 'string'){ 
//         tabContainerTag = config;
//       } else if (typeof(config) == 'object') {
//         tabContainerTag = config.tabContainer;
//       }
//       self.tabContainer = document.querySelector(tabContainerTag)
//       if (self.tabContainer!==null && self.tabContainer!==undefined) {
//         configurate();
//       } else {
//         return false;
//       }
//   }


//   function configurate(){
//       tabSelects = config.tabSelects ? _$$(config.tabSelects) : _$$('.tabs__block'); 
//       tabSelectedClass = config.tabSelectedClass ? config.tabSelectedClass : 'selected'; 
//       tabSelects.forEach( function(tabElement) {
//         tabElement.onclick =  setEvents.bind(tabElement)
//       });

//       //устанавливается значение выбранной вкладки по умолчанию
//       self.setSelect(tabSelects[0])
//   }


// function setEvents() {
//   self.setSelect.call(this);
// }


// this.clearSelect = function() {
//   if (tabSelects){
//     tabSelects.forEach(function(tabElement){
//       if(tabElement.classList.contains(tabSelectedClass)){
//         tabElement.classList.remove(tabSelectedClass)
//       }
//     })
//   }
// }

// this.setSelect = function(tabElement) {
//   self.clearSelect()
//   let that = this;
//   if(tabElement){
//     that = tabElement;
//   }

//   //  необходимо поставить проверку, что that существует
//   if(true){
//     that.classList.add(tabSelectedClass);
//   }

  
// }

// this.hideTab = function() {
  
// }
 

//   function _$(tag){
//       return self.tabContainer.querySelector(tag)
//   }

//   function _$$(tag){
//     return Array.prototype.slice.call(document.querySelectorAll(tag), 0 )
//   }


//   this.initialize();
// }



// let tab = new Tabs({
//   tabContainer : '.blog_details__container',
//   tabSelects : '.tabs__block',
//   tabSelectedClass : 'selected'
// })

// /*tab.setSelect(document.querySelectorAll('.tabs__block')[2])*/
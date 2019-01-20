'use strict';


import addTabs from './functions/tabs.js';

addTabs();
// Массив разрешений для отслеживания прохождения разрешений (накапливается из вызовов функций)
let resizeResolutions = [920]; // ! сделать, чтобы resizeHandler() подхватывала дополненные разрешени

// собираем все ссылки на уже подключенные скрипты
let refArray = Array.from(document.querySelectorAll('script')).map(script => script.src).filter(src => src.length > 0);

// сюда складываются все результаты вызовов функций
let funcObj = {};

let defferedCall = {} // накопление функций с отложенным вызовом

// здесь задаются все условия и порядок вызова функций
let callStack = {
    menu: {
        expression: document.querySelector('.header'),
        ref: '/local/templates/website/js/NVJS_Menu.js',
        callFunc: () => { 
            new NVJSMenu({}) 
        },
        /* async: 'false',
        callback: '', */
    },
    swiper: {
        expression: document.querySelector('.swiper-container'),
        ref: '/local/templates/website/js/vendors/swiper.js',
        callFunc: addSwiper,
        /* async: 'false',
        callback: '', */
    },
    cookieAgreement: {
        expression: !(localStorage.getItem(window.location.hostname+'_cookieAgreement')),
        ref: '/local/templates/website/js/NVJS_CookieAgreement.js',
        callFunc: externalCall,
        callback: 'showCookieAgreement',
        /* async: 'false',
        callback: '', */
    },
    form: {
        expression: document.querySelector('form'),
        ref: '/local/templates/website/js/NVJS_Form.js',
        callFunc: () => {
            Array.apply(null, document.querySelectorAll('form')).forEach(form => {
                new NJVSForm(form);
            })
        },
        async: 'modal'
    },
    videoRel: {
        expression: document.querySelector('.main_banner__video'),
        ref: '',
        callFunc: videoRel,
        /* callback: '', */
    },
    resizeHandler: {
        expression: true,
        callFunc: resizeHandler,
    },
    parallax: {
        expression: document.querySelector('.parallax'),
        callFunc: parallax
    }, 
    modal: {
        expression: document.querySelector('.modal'),
        ref: '/local/templates/website/js/NVJS_Modal.js',
        callFunc: addModal,
        async: 'cookieAgreement',
    },
};

function externalCall(externalFunc) {
    if (window[externalFunc]) {
        window[externalFunc]();
    }
    
}

function callFunction(key) {
    if (this.callFunc) {
        let initResult = this.callFunc(this.callback);

        funcObj[key] = initResult

        return initResult;
    }
}

// прогоняем все значения callstack и вызываем наобходимые функции в необходимом порядке
Promise.all(Object.keys(callStack).map(callStackInitialize))
    .then(() => {
        return Promise.all(Object.keys(defferedCall).map(callStackUnassociated))
    })
    .then(() => {
        callStackDeffered()
    })
    .catch((e) => {
        console.log(e)
    })
    
function callStackInitialize(key) {

    if (callStack[key] && (callStack[key].expression || typeof callStack[key].expression === 'undefined')) {
        let data = callStack[key];

        // переписать на проверку уже в вызванных функциях
        if (data.async) {
            if (!data.ref) {
                defferedCall[key] = new Promise((resolve) => {
                    resolve();
                })
            } else if (!refArray.includes(callStack[data.async].ref)) {
                defferedCall[key] = createPromise(data.ref);
                refArray.push(data.ref);
            }
        } else if (data.ref && !refArray.includes(data.ref)) { 

            return createPromise(data.ref)
                .then(() => {
                    refArray.push(data.ref);
                    callFunction.call(data, key);
                })
                .catch((e) => {
                    console.error(e);
                    console.warn(`script ${key} on ${data.ref} was rejected, some functions may work wrong`);
                });
                
        } else {
            return new Promise((resolve) => {
                callFunction.call(data, key)
                resolve()
            });
        }

    }

}

function callStackUnassociated(key) {
    let data = callStack[key];
    let blocked = data.async;

    // проверяем скрипты, у которых родители не могут быть вызваны для данной страницы и вызываем их и заодно начинаем вызов отложенных функций
    if ((!(blocked in funcObj) && !(blocked in defferedCall)) || (blocked in funcObj)) {

        return defferedCall[key]
            .then(() => {
                callFunction.call(data, key);
                delete defferedCall[key];
            });
    }
}

function callStackDeffered() {
    Promise.all(Object.keys(defferedCall).map(key => {
        let data = callStack[key];
        let blocked = data.async;    
        
        if (blocked in funcObj) {

            return defferedCall[key]
                .then(() => {
                    callFunction.call(data, key);
                    delete defferedCall[key];
                });
        }
    })).then(() => {
        // console.log(Object.keys(defferedCall))
        if (Object.keys(defferedCall).length > 0) {
            callStackDeffered()
        }
    })
    .catch(e => {
        
    })

}

/* ************************ common functions ************************ */

function addSwiper() {

    let swiperCallStack = [
        {
            selector: '.main_section .swiper-container',
            // status: false,
            reload: 920,
            forSmall: true, // будет деактивироваться для экрабов более 920px
            config: {
                speed: 500,
                loop: true,
            },
            navigation: {
                prevEl: 'prev',
                nextEl: 'next',
            },
            callback: stealElements
        }
    ]
    
    swiperCallStack.forEach(swiperConfig => {
        if (document.querySelector(swiperConfig.selector)) {
            Array.from(document.querySelectorAll(swiperConfig.selector)).forEach(swiper => {
                let swiperEl;

                if (!swiperConfig.reload) {
                    createSwiper();
                } else {
                    if (!resizeResolutions.includes(swiperConfig.reload)) {
                        resizeResolutions.append(swiperConfig.reload)
                    }
                    checkResize();
                    window.addEventListener('restartOnResize', checkResize);
                }

                if (swiperConfig.callback) {
                    swiperConfig.callback.call(swiper);
                }

                function checkResize() {
                    if ((!swiperEl || swiperEl && swiperEl.destroyed) && (swiperConfig.reload > window.innerWidth) && swiperConfig.forSmall ) {
                        createSwiper();
                    } else if (swiperEl && (swiperConfig.reload < window.innerWidth) && swiperConfig.forSmall) {
                        swiperEl.destroy()
                    }
                }

                function createSwiper() {
                    let config = swiperConfig.config;

                    // создаем  навигацию в конфиге для слайдера по отношению к этому слайдеру
                    if (swiperConfig.navigation) {
                        config.navigation = {}
                        if (swiperConfig.navigation.nextEl) {
                            config.navigation.nextEl = swiper.getElementsByClassName(swiperConfig.navigation.nextEl);
                        }
                        if (swiperConfig.navigation.prevEl) {
                            config.navigation.prevEl = swiper.getElementsByClassName(swiperConfig.navigation.prevEl);
                        }
                    }

                    swiperEl = new Swiper(swiper, config);
                }

            })
        }
    })
}

// подбор необходимого разрешения для видео и вставка его ссылки на сайт
function videoRel() {
    let step = [768, 1200, 1440, 1920];
    let format = { 'webm': 'video/webm', 'mp4': 'video/mp4' }
    let video = document.querySelector('.main_banner__video video');
    let resolution = minmax(window.innerWidth, step);

    Object.keys(format).forEach(name => {
        let source = document.createElement('source');

        source.type = format[name];
        source.src = `/videos/background${resolution}.${name}`;
        video.append(source);
    });

    // video.addEventListener('loadedmetadata', function() {
    //     this.currentTime = 18;
    // }, false);


    function minmax(count, arr) {
        let result = Math.min.apply(null, arr.filter(elem => elem > count));

        return isFinite(result) ? result : Math.max.apply(null, arr);
    }
}

// вызывается из addSwiper(), для выравнивания всез элементов по высоте
function stealElements() {
    let self = this;
    self.heightMap = {};

    controlHeight();

    window.addEventListener('resize', () => {
        self.heightMap = {};
        controlHeight();
    });

    function controlHeight() {
        changeHeight.call(self, self.heightMap, 'get')
        changeHeight.call(self, self.heightMap, 'set')
    }

    function changeHeight(heightMap, solution) {
        Array.from(this.getElementsByClassName('card__information')).forEach(element => {
            Array.from(element.children).forEach(child => {
                if (solution == 'get') {
                    if (child.style.minHeight) child.style.minHeight = '';

                    if (!heightMap[child.className]) {
                        heightMap[child.className] = 0;
                    }
    
                    let height = heightMap[child.className];
                    let checkHeight = +(getComputedStyle(child).height.split('px')[0]);
    
                    if (height < checkHeight) {
                        heightMap[child.className] = checkHeight;
                    }
                } else if (solution == 'set') {
                    child.style.minHeight = heightMap[child.className] + 'px';
                }
            })
        });
    }

}

// подбор необходимого разрешения для видео и вставка его ссылки на сайт
function parallax() {
    let parallaxed = Array.from(document.querySelectorAll('.parallax'))

    window.addEventListener('scroll', () => {
        let scroll = window.scrollY;
        
        parallaxed.forEach(elem => {
            elem.style.transform = `translateY(${scroll * 0.5}px)`
        })
    })
}

function addModal() {

    addAgreementModal();
    addPagesModal();

    function addPagesModal() {

        if ( document.querySelector('.modal[data-call="buy_modal"]')) {
            new NVJSModal('.modal[data-call="buy_modal"]', {
                modalShowClass: 'open',
                modalBody: '.modal__container',
                modalShowButtons: '.buy__link',
                lockBody: true,
                modalCloseButton: '.modal__close'
            });
        }

    }

    function addAgreementModal() {
        let agreementModalsArray = [];
     
        if ( document.querySelector('.modal[data-call="agreement_modal"]')) {
            let agreementModal = new NVJSModal('.modal[data-call="agreement_modal"]', {
                modalShowClass: 'open',
                modalShowButtons: '.agreement_link',
                modalBody: '.modal__container',
                modalCloseButton: '.modal__close'
            });

            agreementModal.pathFile = '/local/templates/website/documents/processing_of_personal_data.html';
            agreementModalsArray.push(agreementModal);
        }

        if ( document.querySelector('.modal[data-call="politics_modal"]')) {
            let politicsModal = new NVJSModal('.modal[data-call="politics_modal"]', {
                modalShowClass: 'open',
                modalShowButtons: '.confidential_link',
                modalBody: '.modal__container',
                modalCloseButton: '.modal__close'
            });

            politicsModal.pathFile = '/local/templates/website/documents/privacy_policy.html';
            agreementModalsArray.push(politicsModal);

        }
        
        if ( document.querySelector('.modal[data-call="cookies_modal"]')) {
            let cookiesModal = new NVJSModal('.modal[data-call="cookies_modal"]', {
                modalShowClass: 'open',
                modalShowButtons: '.cookies_link',
                modalBody: '.modal__container',
                modalCloseButton: '.modal__close'
            });

            cookiesModal.pathFile = '/local/templates/website/documents/cookie_processing_policy.html';
            agreementModalsArray.push(cookiesModal);
        }
        // if ( document.querySelector('.modal[data-call="payment_modal"]')) {
        //     let paymentModal = new NVJSModal('.modal[data-call="payment_modal"]', {
        //         modalShowClass: 'open',
        //         modalShowButtons: '.payment_link',
        //         modalBody: '.modal__container',
        //         modalCloseButton: '.modal__close'
        //     });

        //     paymentModal.pathFile = '/local/templates/website/documents/payment_policy.html';
        //     agreementModalsArray.push(paymentModal);
        // }

        agreementModalsArray.forEach(modal => {
            modal.isFirstShown = false;

            if (!modal.isFirstShown) {
                modal.modal.addEventListener('show', agreementModalsAddContent);

            }

            function agreementModalsAddContent() {
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

        function loadModalContent(url) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.open('GET', url);

                xhr.send();

                xhr.addEventListener('load', ()=>{
                    if (xhr.status == 404) {
                        reject();
                    } else {
                        resolve(xhr.response);
                    }
                });
            });
        }
    }
}

/* ************************ ./common functions ************************ */
/* ************************ services functions ************************ */

function createPromise(ref) {
    return new Promise((resolve, reject) => {
        let addedScript = document.createElement('script');

        addedScript.src = ref;
        addedScript.async = true;
        document.body.append(addedScript);
        addedScript.onload = function() {
            resolve();
        };
        addedScript.onerror = function() {
            reject(ref);
        };
    })
    .catch((ref) => {
        console.warn(`script link ${ref} was not add, because link adress doesn't exist`)
    });
}

function resizeHandler(resolutions, restart) {
    // ! продумать, как можно убрать несколько вызовов функции resizeSolution при прохождении через контрольную точку, не заблокировав вызов других точек
    // ! доработать перезагрузку страницы при необходимости
    let xpos = 0;
    let lastxPos;
    let widening; // show forward of resize

    let prevFlag; 
    let nextFlag;

    getFlags();
        
    window.addEventListener('resize', () => {
        lastxPos = xpos;
        xpos = window.innerWidth;

        if ((xpos > lastxPos) && (nextFlag > lastxPos)) {
            widening = true;
            resizeSolution()
        } else if ((xpos < lastxPos) && (lastxPos < prevFlag )) {
            resizeSolution()
            widening = false;
        }
    });

    function resizeSolution() {
        getFlags()
        window.dispatchEvent(new Event('restartOnResize'));
    }

    function getFlags() {
        if (widening === true) {
            prevFlag = nextFlag;
            nextFlag = getFlag('next');
        } else if (widening === false) {
            nextFlag = prevFlag;
            prevFlag = getFlag('prev');
        } else {
            prevFlag = getFlag('prev'); 
            nextFlag = getFlag('next');
        }
    }

    function getFlag(forward) {
        let k = forward == 'prev' ? -1 : 1;
        let foundElement;

        resizeResolutions.forEach(elem => {
            if ((window.innerWidth * k) < (elem * k)) {
                foundElement = elem;
            }
        });
        
        return foundElement;
    }
}
// ! Доработка плавного скроллинга при клике на якорь
// ! Доработка lazy load изображений

/* ************************ ./services functions ************************ */


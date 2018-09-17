function showCookieAgreement(){

    let cookieAgreement = createHTML();
    document.body.appendChild(cookieAgreement);

    let styleSheet = createStyleSheet();
    document.body.append(styleSheet);


    let container = document.querySelector('.cookie_agreement');
    let agreementButton;

    if(container){
        container.classList.add('shown');
        agreementButton = container.querySelector('.button');
        agreementButton.addEventListener('click', setLocalStorageItem)
    }

    function setLocalStorageItem(){
        localStorage.setItem(window.location.hostname+'_cookieAgreement', true);
        agreementButton.removeEventListener('click', setLocalStorageItem);
        container.classList.remove('shown');
        setTimeout(() => { 
            // container.querySelector('.cookie_agreement__block').textContent = "Точно?"
            // agreementButton.textContent = "Да!"
            container.parentElement.removeChild(container);
        },450);
    }

    function createHTML(){
        let cookieAgreement = document.createElement('div');
        cookieAgreement.className = 'cookie_agreement';
        cookieAgreement.innerHTML = `
        <div class="wrapper">
            <div class="cookie_agreement__container">
            <div class="cookie_agreement__block">Мы используем cookie. Это нужно для того, чтобы мы могли сделать сайт более удобным для Вас. Окно закроется после того, как вы нажмете нижерасположенную кнопку "согласен". Нажимая на кнопку, Вы даете согласие на <a class="cookie_agreement__link agreement__link" href="">обработку своих персональных данных</a>, соглашаетесь с <a class="cookie_agreement__link confidential__link" href="">политикой конфиденциальности</a>и<a class="cookie_agreement__link cookies__link" href="">политикой в отношении файлов cookie и файлов, хранящихся в локальном хранилище браузера (local storage)</a>.</div>
            <div class="button white_btn">Согласен</div>
            </div>
        </div>
        `;
        
        return cookieAgreement;

    }


    function createStyleSheet(){
        let styleSheet = document.createElement('style');
        let stylesInner = `
            .cookie_agreement {
                position: fixed;
                left: 0;
                right: 0;
                bottom: -100%;
                min-height: 120px;
                padding: 30px 0 40px;
                z-index: 30;
                -webkit-transition: bottom 450ms ease-in-out;
                -o-transition: bottom 450ms ease-in-out;
                transition: bottom 450ms ease-in-out;
            }
            .cookie_agreement::after {
                display: block;
                content: '';
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                background: -webkit-linear-gradient(355deg, var(--green-text) 0, var(--blue_color) 99%);
                background: -o-linear-gradient(355deg, var(--green-text) 0, var(--blue_color) 99%);
                background: linear-gradient(95deg, var(--green-text) 0, var(--blue_color) 99%);
            }
            .cookie_agreement__container {
                position: relative;
                z-index: 31;
            }
            .cookie_agreement__block {
                color: #ffffff;
                font-size: 16px;
                margin-bottom: 20px;
            }
            .cookie_agreement__link,
            .cookie_agreement__link.confidential__link {
                font-size: inherit;
                -webkit-text-decoration: underline solid;
                        text-decoration: underline solid;
                color: inherit;
            }
            .cookie_agreement.shown {
                bottom: 0;
            }
        `;

        styleSheet.innerHTML = stylesInner;
        return styleSheet;
    }

    return true;

}

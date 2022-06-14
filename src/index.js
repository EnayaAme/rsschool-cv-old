"use strict"

// работать с DOM лучше после того, как загрузился window//
window.onload = function() {
    // СКРОЛЛ НАВЕРХ //

    var scrollButton = document.querySelector('.scroll_button');

    window.addEventListener('scroll', trackScroll); // отслеживаем скролл и вешаем функцию //
    // при скролле на высоту окна пользователя, делаем кнопку видимой //
    function trackScroll() {
        var scrolled = window.pageYOffset;
        var coords = document.documentElement.clientHeight;
        
        if (scrolled > coords) {
            scrollButton.classList.add('scroll_button-active');
        }
        if (scrolled < coords) {
            scrollButton.classList.remove('scroll_button-active');
        }
    }
    
    scrollButton.addEventListener('click', backToTop); // отслеживаем клик и вешаем функцию //
    // при клике прокрутка вверх //
    function backToTop() {
    window.scrollTo(pageXOffset, 0); // я хз, почему оно зачеркнуто, но оно работает
    }
}


// ВЫПАДАЮЩЕЕ МЕНЮ //

var headerButton = document.querySelector('.header_button');
var header = document.querySelector('.header');

headerButton.addEventListener("click", toggleMenu);
function toggleMenu() {
    headerButton.classList.toggle('_active')
    header.classList.toggle('_active')
}







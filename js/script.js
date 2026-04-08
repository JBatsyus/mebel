// Инициализация слайдеров для всех карточек
document.addEventListener('DOMContentLoaded', () => {
    const furnishingSlider = new Swiper('.b2b-furnishing__slider', {
        slidesPerView: 1.001, // Показывает часть следующего слайда
        spaceBetween: 8,
        loop: true,
        grabCursor: true,
        speed: 1500,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        navigation: {
            nextEl: '.b2b-furnishing__arrow--next',
            prevEl: '.b2b-furnishing__arrow--prev',
        },
        breakpoints: {
            768: {

                spaceBetween: 20,
            },
            1440: {
                slidesPerView: 2,
                spaceBetween: 24,
            }
        }
    });
});
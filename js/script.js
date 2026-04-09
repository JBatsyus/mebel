// Инициализация слайдеров для всех карточек
document.addEventListener('DOMContentLoaded', () => {
    const furnishingSlider = new Swiper('.b2b-furnishing__slider', {
        slidesPerView: 1.001, 
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

    const fileInput = document.getElementById('b2b-form-file');
    const fileList = document.getElementById('uploaded-file');
    const fileArea = document.querySelector('.b2b-form__file-area');
    const MAX_SIZE = 3 * 1024 * 1024; // 3 MB

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    fileArea.addEventListener('dragover', () => fileArea.classList.add('dragover'));
    fileArea.addEventListener('dragleave', () => fileArea.classList.remove('dragover'));

    fileArea.addEventListener('drop', (e) => {
        fileArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    function handleFiles(files) {
        // Берем только первый файл из списка
        const file = files[0];

        if (!file) return;

        if (file.size > MAX_SIZE) {
            alert(`Файл ${file.name} слишком большой (макс. 3 Мбайт)`);
            fileInput.value = ''; // Сбрасываем инпут
            return;
        }

        addFileToList(file);
    }

    function addFileToList(file) {
        // Очищаем список перед добавлением нового файла (чтобы был только один)
        fileList.innerHTML = '';

        const item = document.createElement('div');
        item.className = 'b2b-form__file-item';

        item.innerHTML = `
        <span>${file.name}</span>
        <button type="button" title="Удалить" aria-label="Удалить">
            <svg width="14" height="14" viewBox="0 0 19 19" fill="none" style="transform: rotate(45deg);">
                <path d="M9.38 0C9.92 0 10.36 0.43 10.36 0.98V8.4H17.78C18.32 8.4 18.76 8.83 18.76 9.38C18.76 9.92 18.32 10.36 17.78 10.36H10.36V17.78C10.36 18.32 9.92 18.76 9.38 18.76C8.83 18.76 8.4 18.32 8.4 17.78V10.36H0.98C0.43 10.36 0 9.92 0 9.38C0 8.83 0.43 8.4 0.98 8.4H8.4V0.98C8.4 0.43 8.83 0 9.38 0Z" fill="#A9A9A9" />
            </svg>
        </button>
    `;

        item.querySelector('button').onclick = () => {
            item.remove();
            fileInput.value = '';
        };

        fileList.appendChild(item);
    }

});
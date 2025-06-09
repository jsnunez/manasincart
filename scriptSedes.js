const wrapper = document.getElementById('carouselWrapper');
const cards = Array.from(wrapper.children);
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 1; // Empieza en el slide "Centro" (índice 1)
const totalSlides = 9; // Total de slides reales (sin contar el "CIE" y el "Centro" de inicio y final)
let autoSlideInterval = null;

// Función para actualizar la visualización del carrusel
function updateCarousel() {
    cards.forEach((card, i) => {
        card.classList.remove('center', 'side');
        card.style.display = 'none';
    });

    const realIndex = currentIndex % totalSlides;
    cards[realIndex].classList.add('center');
    cards[realIndex].style.display = 'flex';

    const prevIndex = (realIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (realIndex + 1) % totalSlides;

    cards[prevIndex].classList.add('side');
    cards[prevIndex].style.display = 'flex';

    cards[nextIndex].classList.add('side');
    cards[nextIndex].style.display = 'flex';

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentIndex);
    });
}

// Evento para el botón "prev"
prevBtn.addEventListener('click', () => {
    if (currentIndex == 1) {
        currentIndex = 7;
    } else {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    }
    updateCarousel();
    resetAutoSlide();
});

// Evento para el botón "next"
nextBtn.addEventListener('click', () => {
    if (currentIndex == 7) {
        currentIndex = 1;
    } else {
        currentIndex = (currentIndex + 1) % totalSlides;
    }
    updateCarousel();
    resetAutoSlide();
});

// Evento para los indicadores
indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
        resetAutoSlide();
    });
});

// Auto-slide
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (currentIndex == 7) {
            currentIndex = 1;
        } else {
            currentIndex = (currentIndex + 1) % totalSlides;
        }
        updateCarousel();
    }, 4000); // Cambia cada 4 segundos
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Inicializa el carrusel y auto-slide
updateCarousel();
startAutoSlide();
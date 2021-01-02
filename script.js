//  Slider
const slides = document.querySelectorAll('.slide'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    slidesWrapper = document.querySelector('.carousel__wrapper'),
    slidesField = document.querySelector('.carousel__inner'),
    width = parseInt(window.getComputedStyle(slidesWrapper).width);
let slideIndex = 1;
let offset = 0;

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';
slidesWrapper.style.position = 'relative';

slides.forEach(slide => {
    slide.style.width = width + 'px';
});

const indicators = document.createElement('ol'),
      dots = [];

indicators.classList.add('carousel-indicators');

slidesWrapper.append(indicators);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i + 1);

    if (i == 0) {
        dot.classList.add('dot_active');
    }
    indicators.append(dot);
    dots.push(dot);

}


function changeDots () {
    dots.forEach(dot => dot.classList.remove('dot_active'));
    dots[slideIndex - 1].classList.add('dot_active');
}

function transformSlidesField() {
    slidesField.style.transform = `translateX(-${offset}px)`;
}



next.addEventListener('click', () => {
    if (offset == width * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += width;
    }

    transformSlidesField();

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    changeDots ();
});

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = width * (slides.length - 1);
    } else {
        offset -= width;
    }

    transformSlidesField();


    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    changeDots ();
});


dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = width * (slideTo - 1);

        transformSlidesField();

        changeDots ();

    });
});


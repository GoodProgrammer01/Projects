const captionSwiper = [
    {
        https: "https://livedemo00-opencart.template-help.com/opencart_prod-23516/image/cache/catalog/slide-1-870x345.jpg",
        h3: "IPHONE X",
        p: "iOS 11 робить iPhone таким розумним, що він вчиться у вас.",
        a: "Придбати!"
    },
    {
        https: "https://livedemo00-opencart.template-help.com/opencart_prod-23516/image/cache/catalog/slide-3-870x345.jpg",
        h3: "IPAD",
        p: "iOS 11 робить iPhone таким розумним, що він вчиться у вас.",
        a: "Придбати!"
    },
    {
        https: "https://livedemo00-opencart.template-help.com/opencart_prod-23516/image/cache/catalog/slide-2-870x345.jpg",
        h3: "Smart TV",
        p: "iOS 11 робить iPhone таким розумним, що він вчиться у вас.",
        a: "Придбати!"
    }
]

const swipeArarrowLeft = document.querySelector(".swiper-arrow-left");
const swipeArarrowRight = document.querySelector(".swiper-arrow-right");

let currentIndex = 0;
const swiperSlide = document.querySelector(".swiper-slide");
let isAnimating = false;

function animationCaption() {
    isAnimating = true; 
    const swiperCaption = document.querySelector(".swiper-caption");
    if (swiperCaption){
        if (currentIndex >= 0 && currentIndex < captionSwiper.length) {
            const urlImage = captionSwiper[currentIndex].https;
            
            const h3 = document.createElement("h3");
            h3.textContent = captionSwiper[currentIndex].h3;

            const p = document.createElement("p");
            p.textContent = captionSwiper[currentIndex].p;

            const a = document.createElement("a");
            a.textContent = captionSwiper[currentIndex].a;
            
            swiperSlide.style.backgroundImage = `url(${urlImage})`;
                        
            swiperCaption.innerHTML = "";
            swiperCaption.append(h3, p, a);
        }
        // Затримка для кнопок поки не завершиться анімація
        setTimeout(() => {
            isAnimating = false;
        }, 700);
    }
}

let interval = setInterval(changeSlide, 10000);

function changeSlide(forward = true) {
    if (isAnimating) {
        return; // Не змінюється слайд, якщо відбувається анімація
    }
    if (forward) {
        currentIndex = (currentIndex + 1) % captionSwiper.length;
    } else {
        currentIndex = (currentIndex - 1 + captionSwiper.length) % captionSwiper.length;
    }
    animationCaption();
    clearInterval(interval);
    interval = setInterval(changeSlide, 10000);
}

function callAnimation(){
swipeArarrowLeft.addEventListener("click", () => changeSlide(false));
swipeArarrowRight.addEventListener("click", () => changeSlide());
animationCaption();
}

function swipeImage(currentIndex){
    const swipeImgList = document.querySelector('.swipe-img');
    const arrowLeft = document.querySelector('.left-arrow');
    const arrowRight = document.querySelector('.right-arrow');

    if(swipeImgList){
        const liElements = swipeImgList.querySelectorAll('li');
    
        function showImage(index) {
            liElements[currentIndex].classList.remove('show-img');
            liElements[index].classList.add('show-img');
            currentIndex = index;
        }
    
        arrowLeft.addEventListener('click', function () {
            let newIndex = (currentIndex - 1 + liElements.length) % liElements.length;
            showImage(newIndex);
        });
    
        arrowRight.addEventListener('click', function () {
            let newIndex = (currentIndex + 1) % liElements.length;
            showImage(newIndex);
        });
    }
}

function callAnimationForReview() {
    const reviewBackground = document.querySelector('.review-background');
    const reviewBlock = document.querySelector('.review-block');
    const exitButton = document.querySelector('.exit-block');
    const review = document.querySelector('.review');
    const html = document.documentElement;

    function handleExit() {
        reviewBlock.style.animationName = 'opacityDown';
        reviewBackground.style.animation = 'opacityDownReview 0.5s ease';
        setTimeout(() => {
            reviewBackground.remove();
            html.classList.remove('html-scroll');
        }, 500);
        setTimeout(() => {
            reviewBlock.remove();
            review.remove();
        }, 1000);
    }

    if (exitButton) {
        exitButton.addEventListener('click', handleExit);
    }

    if (reviewBackground) {
        reviewBackground.addEventListener('click', handleExit);
    }
}

export {callAnimation, swipeImage, callAnimationForReview}
import { createButton, checkBackground, checkBackgroundForReview } from './Utils/buttonUtils.js';
import { handleAddToCart, handleWishList , handleComparison} from './general-module/handleAdd.js';
import { fetchData } from './general-module/fetchData.js';
import { swipeImage, callAnimationForReview } from './general-module/animation.js';
import { cartItems } from './general-module/cartListMini.js';
import { wishItems , comparisonItems } from './general-module/localStorage.js';
import { createProductElement } from './Utils/renderUtils.js';
const renderProduct = () => {   
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const mainImg = document.querySelector('.main-image');
    const nameProduct = document.querySelector('.prod');

    function renderProductId(id) {
        let filteredProduct = [];
        fetchData()
            .then(productData => {
                filteredProduct = productData.find(product => product.id === parseInt(id, 10));
                renderProduct(filteredProduct);
                renderProductImage(filteredProduct)
                
                const handleClickWidth = () => {
                    const screenWidth = window.innerWidth;
                
                    if (screenWidth < 1000) {
                        return; 
                    }
                
                    renderReviewImage(filteredProduct);
                };
                mainImg.addEventListener('click', handleClickWidth);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }
    function renderProduct(product){
        const infoProduct = document.querySelector('.info-product');
        const addBlock = document.querySelector('.add-block');

        const productName = document.createElement('h2');
        const productUl = document.createElement('ul');
        const liBrand = document.createElement('li');
        const liType = document.createElement('li');
        const liProductCode = document.createElement('li');
        const liAvailability = document.createElement('li');
        const emBrand = document.createElement('em');
        const emType = document.createElement('em');
        const emProductCode = document.createElement('em');
        const emAvailability = document.createElement('em');
        const productPrice = document.createElement('div');
        const price = document.createElement('h3');

        const btnBuy = createButton('В кошик', 'btn-buy', () => handleAddToCart(product));
        const btnWish = createButton('В список бажань', 'btn-wish', () => handleWishList(product));
        const btnComparison = createButton('В порівняння', 'btn-comparison', () => handleComparison(product));
        btnBuy.setAttribute('id', `btn-buy:prod-${product.id}`);

        function handleButtonClick(btn) {
            btn.style.background = "none";
            btn.style.color = "#2f2f2f";
        }
        btnWish.addEventListener('click', () => handleButtonClick(btnWish));
        btnComparison.addEventListener('click', () => handleButtonClick(btnComparison));

        const isInCart = cartItems.some(item => item.productId === product.id);
        const isInWishlist = wishItems.some(item => item.productId === product.id);
        const isInComparisonlist = comparisonItems.some(item => item.productId === product.id);

        checkBackground(isInCart, btnBuy);
        checkBackgroundForReview(isInWishlist, btnWish);
        checkBackgroundForReview(isInComparisonlist, btnComparison);
        nameProduct.textContent = product.name;

        productName.textContent = product.name;

        emBrand.textContent = "Samsung";
        emType.textContent = product.type;
        emProductCode.textContent = "Колекційний";
        emAvailability.textContent = product.Availability;
        console.log(product.type)
        liBrand.textContent = `Бренд:`;
        liType.textContent = `Тип:`;
        liProductCode.textContent = `Код товару:`;
        liAvailability.textContent = `Наявність:`;

        price.textContent = product.price;

        productPrice.classList.add('product-price');

        btnBuy.classList.add('add-button');
        emAvailability.style.color = '#34b1da';

        liBrand.appendChild(emBrand);
        liType.appendChild(emType);
        liProductCode.appendChild(emProductCode);
        liAvailability.appendChild(emAvailability);
        productUl.append(liBrand, liType, liProductCode, liAvailability);
        productPrice.append(price);
        infoProduct.append(productName, productUl, productPrice);
        addBlock.append(btnBuy, btnWish, btnComparison);
    }
    function renderProductImage(product){
        const miniImg = document.querySelector('.mini-image');
        product.image.forEach((imageSrc, index) => {
            const aImgMini = document.createElement('a');
            const imgMini = document.createElement('img');
            imgMini.src = imageSrc;
            imgMini.alt = "Product Image Mini";
            if (index === 0) {
                const imgMain = document.createElement('img');
                
                imgMain.src = imgMini.src;
                imgMain.alt = "Product Image Main";
                imgMain.setAttribute('id', 'img-click')
                mainImg.appendChild(imgMain);

                aImgMini.classList.add('current-img');
            }
            aImgMini.appendChild(imgMini);
            miniImg.appendChild(aImgMini);     
            aImgMini.addEventListener('click', () => {
                const imgMain = document.querySelector('.main-image img');
                // Видалення класу 'current-img' з усіх мініатюрних зображень
                miniImg.querySelectorAll('a').forEach(item => item.classList.remove('current-img'));
    
                // Додавання класу 'current-img' до поточного мініатюрного зображення
                aImgMini.classList.add('current-img');
    
                // Змінюю велике зображення на поточне мініатюрне зображення
                imgMain.src = imgMini.src;
            });      
        });
    }
    function renderReviewImage(productData) {
        const reviewBackground = document.createElement('div');
        const mainBlock = document.createElement('div');
        const scroolBlock = document.createElement('div');
        mainBlock.classList.add('main-block');
        scroolBlock.classList.add('scroll-block');
        
        const container = document.createElement('div');
        const reviewBlock = document.createElement('div');
        const exitBlock = document.createElement('button');
        const exit = document.createElement('div');
    
        const arrowLeft = document.createElement('button');
        const left = document.createElement('p');
        const arrowRight = document.createElement('button');
        const right = document.createElement('p');

        let currentImg = document.querySelector('.current-img img');
        let currentIndex = productData.image.indexOf(currentImg.src);
        const swipeImg = document.createElement('ul');
        productData.image.forEach((imageUrl, index) => {
            const liImg = document.createElement('li');
            const imgReview = document.createElement('img');
            imgReview.src = imageUrl;
            imgReview.alt = "Product Image";
            if (index === currentIndex) {
                liImg.classList.add('show-img');
            }
            liImg.appendChild(imgReview);
            swipeImg.appendChild(liImg);          
        });
    
        exit.textContent = "✖";
    
        left.textContent = "❮";
        right.textContent = "❯";
    
        reviewBackground.classList.add('review-background');
        reviewBlock.classList.add('review-block', 'review-image');
        container.classList.add('container', 'review');
        exit.classList.add('exit');
        exitBlock.classList.add('exit-block');
    
        arrowLeft.classList.add('left-arrow', 'arrow', 'left');
        arrowRight.classList.add('right-arrow', 'arrow', 'right');
        swipeImg.classList.add('swipe-img');
    
        arrowLeft.appendChild(left);
        arrowRight.appendChild(right);
        exitBlock.appendChild(exit);
        reviewBlock.append(swipeImg, exitBlock, arrowLeft, arrowRight);
        reviewBackground.append(mainBlock, scroolBlock);
        container.appendChild(reviewBlock);
        document.body.appendChild(reviewBackground);
        document.body.appendChild(container);
        callAnimationForReview();
        swipeImage(currentIndex);
        document.documentElement.classList.add('html-scroll');
    }
    
    
    const liElements = document.querySelectorAll('.name-description li');
    function infoAboutProduct() {
        liElements.forEach(li => {
            li.addEventListener('click', () => {
                // Видаляю клас від усіх елементів li
                liElements.forEach(item => {
                    item.classList.remove('border-right');
                });
                
                // Додаю клас до клікнутого елемента li
                li.classList.add('border-right');
    
                // Викликаю функцію toggleBlock з відповідним id
                toggleBlock(li.id);
            });
        });
    }
    const tabs = document.querySelectorAll('.tabs .block');
    function toggleBlock(blockId) {
        tabs.forEach(block => {
            block.style.display = 'none';
        });
    
        document.querySelector(`.${blockId}`).style.display = 'block';
    }
    function getRecommendedProducts(id) {
        fetchData()
            .then(productData => {
                // Видалення індексу товару, який відкритий
                const filteredData = productData.filter(product => product.id !== parseInt(id, 10));
                // Згенерував масив випадкових індексів
                const randomIndexes = [];
                while (randomIndexes.length < 6 && randomIndexes.length < filteredData.length) {
                    const randomIndex = Math.floor(Math.random() * filteredData.length);
                    if (!randomIndexes.includes(randomIndex)) {
                        randomIndexes.push(randomIndex);
                    }
                }
    
                // Вибрав відповідні випадкові товари за індексами
                const randomProducts = randomIndexes.map(index => filteredData[index]);
    
                renderGoods(randomProducts);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    function writeReviews(){
        const writeButton = document.getElementById('butt-write');
        const reviewsBlock = document.querySelector('.reviews-block');
        const spanWrite = document.querySelector('.write');
    
        let isExpanded = false;
        spanWrite.addEventListener('click', () => {
            reviewsBlock.classList.add('wrt-rev');

            isExpanded = true;

            liElements.forEach(item => {
                const itemId = item.getAttribute('id'); // Отримую id поточного елемента li
            
                if (itemId !== 'reviews-block') {
                    item.classList.remove('border-right');
                } else{
                    item.classList.add('border-right');
                }
            });
            tabs.forEach(block => {
                block.style.display = 'none';
            });
            document.querySelector('.reviews-block').style.display = 'block';
            reviewsBlock.scrollIntoView({ behavior: 'smooth' });
        });
        writeButton.addEventListener('click', () => {
            if (!isExpanded) {
                reviewsBlock.classList.add('wrt-rev');
                isExpanded = true;
            } else {
                reviewsBlock.classList.remove('wrt-rev');
                isExpanded = false;
            }
        });
    }
    getRecommendedProducts(productId);
    renderProductId(productId);
    infoAboutProduct();
    writeReviews();

    const flexSwipe = document.querySelector(".flex-swipe");
    function renderGoods(itemCount) {
        itemCount.forEach((productData) => {
            const productElement = createProductElement(productData);
            flexSwipe.appendChild(productElement);
        });
    }
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    const transform = 400;

    let isScrolling = false;

// Функція для обробки події кліку на кнопку прокрутки
function handleClick(direction) {
    if (!isScrolling) {
        isScrolling = true;
        const scrollAmount = direction === 'left' ? -transform : transform;
        flexSwipe.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(() => {
            isScrolling = false;
        }, 500); // Затримка в 500 мілісекунд для завершення анімації
    }
}

// Додав обробник події для кнопки прокрутки вліво
arrowLeft.addEventListener('click', () => handleClick('left'));

// Додав обробник події для кнопки прокрутки вправо
arrowRight.addEventListener('click', () => handleClick('right'));
}

export default renderProduct


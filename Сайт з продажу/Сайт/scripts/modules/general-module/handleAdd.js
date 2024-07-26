import {cartItems, addToCartListMini, checkCartListMini, checkOverflow} from './cartListMini.js';
import {comparisonItems, wishItems, saveItemsToLocalStorage} from './localStorage.js';
import {createButton, checkBackground, checkBackgroundForReview} from '../Utils/buttonUtils.js';
import {swipeImage, callAnimationForReview} from './animation.js';

function handleAddToCart(productData) {
    const cartP = document.getElementById('cart-p-quantity');
    const productId = productData.id;
    const existingItem = cartItems.find(item => item.productId === productId);

    if (!existingItem) {
        cartItems.push({ productId, productData });
        addToCartListMini(productData);
        saveItemsToLocalStorage("cartItems", cartItems);
        console.log('Товар додано до кошика.');
        cartP.textContent = `(${cartItems.length})`;
        checkCartListMini(cartItems);
        checkOverflow();
    } else {
        console.log('Цей товар вже є в корзині.');
    }
}
function handleWishList(productData){
    const wishP = document.getElementById('wish-p-quantity');
    const productId = productData.id;
    const existingItem = wishItems.find(item => item.productId === productId);

    if (!existingItem) {
            wishItems.push({ productId, productData });
            saveItemsToLocalStorage("wishItems", wishItems);
            console.log('Товар додано до кошика.');
            wishP.textContent = `(${wishItems.length})`; 
    } else {
            console.log('Цей товар вже є в списку бажань.');
    }
}

function handleComparison(productData){
    const comparisonP = document.getElementById('comparison-p-quantity');
    const productId = productData.id;
    const existingItem = comparisonItems.find(item => item.productId === productId);

    if (!existingItem) {
            comparisonItems.push({ productId, productData });
            saveItemsToLocalStorage("comparisonItems", comparisonItems);
            console.log('Товар додано до кошика.');
            comparisonP.textContent = `(${comparisonItems.length})`; 
    } else {
            console.log('Цей товар вже є в списку порівняння.');
    }
}

function handleReview(productData){
    const reviewBackground = document.createElement('div');
    const mainBlock = document.createElement('div');
    const scrollBlock = document.createElement('div');
    mainBlock.classList.add('main-block');
    scrollBlock.classList.add('scroll-block');

    const container = document.createElement('div');
    const reviewBlock = document.createElement('div');

    const imageProduct = document.createElement('div');
    const leftArrow = document.createElement('a');
    const rightArrow = document.createElement('a');
    const swipeImg = document.createElement('ul');
    productData.image.forEach((imageUrl, index) => {
        const liImg = document.createElement('li');
        const img = document.createElement('img');
        img.src = imageUrl;
        if (index === 0) {
            liImg.classList.add('show-img');
        }
        liImg.appendChild(img);
        swipeImg.appendChild(liImg);
    });
    const reviewInfo = document.createElement('div');
    const h2Name = document.createElement('h2');
    const ulInfo = document.createElement('ul');
    const liBrand = document.createElement('li');
    const liType = document.createElement('li');
    const liProductCode = document.createElement('li');
    const liAvailability = document.createElement('li');
    const emBrand = document.createElement('em');
    const emType = document.createElement('em');
    const emProductCode = document.createElement('em');
    const emAvailability = document.createElement('em');
    const h3Price = document.createElement('h3');
    const reviewButGroup = document.createElement('div');
    const btnBuy = createButton('В кошик', 'btn-buy', () => handleAddToCart(productData));
    const btnWish = createButton('В список бажань', 'btn-wish', () => handleWishList(productData));
    const btnComparison = createButton('В порівняння', 'btn-comparison', () => handleComparison(productData));
    function handleButtonClick(btn) {
        btn.style.background = "none";
        btn.style.color = "#2f2f2f";
    }
    
    btnWish.addEventListener('click', () => handleButtonClick(btnWish));
    btnComparison.addEventListener('click', () => handleButtonClick(btnComparison));

    const isInCart = cartItems.some(item => item.productId === productData.id);
    const isInWishlist = wishItems.some(item => item.productId === productData.id);
    checkBackground(isInCart, btnBuy);
    checkBackgroundForReview(isInWishlist, btnWish);

    const buttonExit = document.createElement('button');
    const exit = document.createElement('div');
    const buttonReviewIdToRemove = 'btn-review:prod-' + productData.id; 
    buttonExit.addEventListener('click', () => {
        const buttonToRemove = document.getElementById(buttonReviewIdToRemove);
        if (buttonToRemove) {
            buttonToRemove.style.background = ''; 
            buttonToRemove.style.color = ''; 
        }
    });
    reviewBackground.addEventListener('click', () => {
        const buttonToRemove = document.getElementById(buttonReviewIdToRemove);
        if (buttonToRemove) {
            buttonToRemove.style.background = ''; 
            buttonToRemove.style.color = ''; 
        }
    });
    leftArrow.textContent = "❮";
    rightArrow.textContent = "❯";

    h2Name.textContent = productData.name;
    h3Price.textContent = productData.price;

    emBrand.textContent = "Samsung";
    emType.textContent = productData.type;
    emProductCode.textContent = "Колекційний";
    emAvailability.textContent = productData.Availability;

    liBrand.textContent = `Бренд:`;
    liType.textContent = `Тип:`;
    liProductCode.textContent = `Код товару:`;
    liAvailability.textContent = `Наявність:`;

    exit.textContent = "✖";

    reviewBackground.classList.add('review-background');
    
    container.classList.add('container', 'review');

    reviewBlock.classList.add('review-block');
    reviewBlock.classList.add('main-width');

    imageProduct.classList.add('image-product');
    leftArrow.classList.add('left-arrow');
    rightArrow.classList.add('right-arrow');
    swipeImg.classList.add('swipe-img');

    reviewInfo.classList.add('review-info');
    emAvailability.classList.add('last')
    reviewButGroup.classList.add('review-button-group');

    buttonExit.classList.add('exit-block');
    exit.classList.add('exit');

    imageProduct.append(leftArrow, swipeImg, rightArrow);
    reviewButGroup.append(btnBuy, btnWish, btnComparison);
    liBrand.appendChild(emBrand);
    liType.appendChild(emType);
    liProductCode.appendChild(emProductCode);
    liAvailability.appendChild(emAvailability);
    ulInfo.append(liBrand, liType, liProductCode, liAvailability);
    reviewInfo.append(h2Name, ulInfo, h3Price, reviewButGroup);
    buttonExit.appendChild(exit);
    reviewBlock.append(imageProduct, reviewInfo, buttonExit);
    reviewBackground.append(mainBlock, scrollBlock);
    container.appendChild(reviewBlock);
    document.body.appendChild(reviewBackground);
    document.body.appendChild(container);
    callAnimationForReview();
    swipeImage(0);
    document.documentElement.classList.add('html-scroll');
}

export {handleAddToCart, handleWishList, handleComparison, handleReview}

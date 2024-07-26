import { saveItemsToLocalStorage } from './general-module/localStorage.js';
import { calculationUtils, totalSumItems } from './Utils/сalculationUtils.js';
let cartItems = [];

export function updateOrderList() {
    const inputQuant = document.querySelectorAll('#input-quant');
    const spanTotalOrder = document.querySelectorAll('#span-price');
    const totalSum = document.querySelector('#total-sum');
    renderOrdering(inputQuant, spanTotalOrder, totalSum);
}
function renderOrdering(inputQuant, spanTotalOrder, totalSum) {
    const orderGoods = document.querySelector('.ordering-goods');
    const totalSumOrder = document.querySelector('.total-sum-order');
    orderGoods.innerHTML = '';
    // Отримати тільки елементи, які існують (не були видалені)
    const existingItems = cartItems.map(item => item.productData).filter((product, index) => {
        return inputQuant[index] && spanTotalOrder[index];
    });
    console.log(existingItems)
    existingItems.forEach((product, index) => {
        const productOrder = document.createElement('div');
        const img = document.createElement('img');
        const aName = document.createElement('a');
        const spanPrice = document.createElement('span');
        const spanTotal = document.createElement('span');

        productOrder.classList.add('ordering-product');

        spanPrice.setAttribute('id', 'ord-prd-price');
        spanTotal.setAttribute('id', 'ord-prd-total');

        img.src = product.mainImage;
        img.alt = "Product Image";
        aName.textContent = product.name;
        aName.href = `product.html?id=${product.id}`
        spanPrice.textContent = `${product.price} × ${inputQuant[index].value}`;
        spanTotal.textContent = spanTotalOrder[index].textContent;

        productOrder.append(img, aName, spanPrice, spanTotal);
        orderGoods.appendChild(productOrder);
    });

    if (totalSumOrder) {
        totalSumOrder.textContent = `Всього до сплати:${totalSum.textContent}`;
    }
}
const ForShop = () => {
    function loadBucketFromLocalStorage() { 
        const storedBucketItems = localStorage.getItem("cartItems");
        if (storedBucketItems) {
            cartItems = JSON.parse(storedBucketItems);
            cartItems.forEach(item => {       
                renderShopCart(item.productData); // Додавання товарів до кошика
            });
        }
    }
    function trackingShop(){
        if (cartItems.length === 0) {
            const empty = document.querySelector('.empty-shop');
            const shopCart = document.querySelector('.shop-cart');
            shopCart.style.display = "none";
            empty.style.display = "block";
        }
    }
    loadBucketFromLocalStorage();
    trackingShop();
function renderShopCart(product) {
    const shopList = document.querySelector('.goods-shop')
    let currentQuantity = 1;

    const productShop = document.createElement('div');

    const imgShop = document.createElement('div');
    const capShop = document.createElement('div');

    const img = document.createElement('img');

    const aName = document.createElement('a');
    const quantityShop = document.createElement('div');
    const delTotShop = document.createElement('div');

    const buttonMinus = document.createElement('button');
    const inputQuantity = document.createElement('input');
    const buttonPlus = document.createElement('button');
    
    const buttonRemove = document.createElement('button');
    const spanPrice = document.createElement('span');
    
    productShop.classList.add('product-shop');

    imgShop.classList.add('image-shop');
    capShop.classList.add('caption-shop');

    quantityShop.classList.add('quantity-shop');
    delTotShop.classList.add('dell-total-shop');
    
    buttonMinus.setAttribute('id', 'btn-minus');
    inputQuantity.setAttribute('id', 'input-quant');
    buttonPlus.setAttribute('id', 'btn-plus');
    buttonRemove.setAttribute('id', 'btn-remove');

    spanPrice.setAttribute('id', 'span-price');

    const priceString = product.price;
    const priceWithoutSymbol = priceString.replace('$', ''); // Видалення символу "$"
    const price = parseFloat(priceWithoutSymbol);
    
    const calculate = currentQuantity * price ;
    img.src = product.mainImage;
    img.alt = "Product Image";
    aName.textContent = product.name;
    aName.href = `product.html?id=${product.id}`
    spanPrice.textContent = `${calculate}$`;

    buttonMinus.textContent = "−";
    inputQuantity.type = "text";
    inputQuantity.value = 1;
    buttonPlus.textContent = "+";
    buttonRemove.textContent = "❌";

    calculationUtils(currentQuantity, price, spanPrice, inputQuantity, buttonMinus, buttonPlus, buttonRemove, productShop, cartItems, product, 2);
 
    quantityShop.append(buttonMinus, inputQuantity, buttonPlus);
    delTotShop.append(buttonRemove, spanPrice);

    capShop.append(aName, quantityShop, delTotShop)
    imgShop.appendChild(img);
    productShop.append(imgShop, capShop);
    shopList.append(productShop);
    totalSumItems();
}
updateOrderList()
const orderList = document.querySelector('.ord-list-scroll');
const btnOrder = document.getElementById('btn-ordering');
const btnExit = document.getElementById('exit-btn');

function orderingList(forward = true, element) {
    if (forward) {
        element.style.visibility = 'visible';
        element.style.animationName = 'opacityUp';
        element.style.display = 'block';   
        if(element === orderList){
            const reviewBackground = document.createElement('div');
            const mainBlock = document.createElement('div');
            const scrollBlock = document.createElement('div');
    
            mainBlock.classList.add('main-block');
            scrollBlock.classList.add('scroll-block');
            const container = document.createElement('div');
            reviewBackground.classList.add('review-background');
            container.classList.add('container', 'review');
            document.documentElement.classList.add('html-scroll');
    
            reviewBackground.append(mainBlock, scrollBlock);
            document.body.appendChild(reviewBackground);
            document.body.appendChild(container);
        }
    } else {
        element.style.animationName = 'opacityDown';
        element.addEventListener('animationend', function animationEndHandler() {
        element.style.visibility = 'hidden';
        element.removeEventListener('animationend', animationEndHandler);
        element.style.display = 'none';   

        const reviewBackground = document.querySelector('.review-background');
        const review = document.querySelector('.review');
        const html = document.documentElement;
        if(reviewBackground){
            reviewBackground.remove();
            review.remove();
            html.classList.remove('html-scroll');
        }
        });
    }
}

btnOrder.addEventListener('click', () => orderingList(true, orderList));
btnExit.addEventListener('click', () => orderingList(false, orderList));

const firstNameBlock = document.querySelector('.first-name-block');
const secondNameBlock = document.querySelector('.second-name-block');
const numberBlock = document.querySelector('.number-block');
const emailBlock = document.querySelector('.email-block');
const mailBlock = document.querySelector('.mail-block');

const firstNameInput = document.getElementById('first-name-inp');
const secondNameInput = document.getElementById('second-name-inp');
const numberInput = document.getElementById('number-inp');
const emailInput = document.getElementById('email-inp');
const mailInput = document.getElementById('mail-inp');

const NamePattern = /^[a-zA-Zа-яА-Я]/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mailPattern = /^[a-zA-Zа-яА-Я0-9\s.,-]+$/;

function addErrorMessage(block, message) {
    const errP = document.createElement('p');
    const previousP = block.querySelector('p');

    if (previousP) {
        previousP.remove();
    }

    if (message) {
        errP.textContent = message;
        errP.style.color = "#ff4545";
        block.appendChild(errP);
    }
}

function validateField(input, pattern, block, emptyMessage, invalidMessage) {
    const inputValue = input.value.trim();
    let message = "";

    if (!inputValue && input.type !== "email") {
        message = `Поле "${input.placeholder}" пусте`;
    } else if (!pattern.test(inputValue) && inputValue) {
        message = `Поле "${input.placeholder}" не коректне`;
    }

    addErrorMessage(block, message || null);
}

// Валідація 
firstNameInput.addEventListener('blur', () => {
    validateField(firstNameInput, NamePattern, firstNameBlock);
});

secondNameInput.addEventListener('blur', () => {
    validateField(secondNameInput, NamePattern, secondNameBlock);
});

emailInput.addEventListener('blur', () => {
    validateField(emailInput, emailPattern, emailBlock, null, "Невірний формат електронної пошти");
});

mailInput.addEventListener('blur', () => {
    validateField(mailInput, mailPattern, mailBlock, null, "Невірний формат поштової адреси");
});

numberInput.addEventListener('input', () => {
    let inputValue = numberInput.value.replace(/\D/g, ''); // Видалення всіх символів, окрім цифр
    let formattedValue = '+';

    for (let i = 0; i < inputValue.length; i++) {
        if (i === 2) {
            formattedValue += `(${inputValue[i]}`;
        } else if (i === 5) {
            formattedValue += `)-${inputValue[i]}`;
        } else if (i === 8) {
            formattedValue += `-${inputValue[i]}`;
        } else if (i >= 10) {
            formattedValue += `-${inputValue.slice(10)}`;
            break;  // Вихід з циклу, оскільки вже оброблено залишок
        } else {
            formattedValue += inputValue[i];
        }
    }
    if(inputValue.length < 3){
        formattedValue = '+38()';
    }
    numberInput.value = formattedValue;
});

numberInput.addEventListener('blur', () => {
    addErrorMessage(numberBlock, numberInput.value.length !== 18 ? "Номер не вірний" : null);
});

const confirmBtn = document.getElementById('confirm-btn');
const confirmedOrder = document.querySelector('.confirmed-order');
const exitConfirm = document.getElementById('exit-confirm');

exitConfirm.addEventListener('click', () => {
    orderingList(false, confirmedOrder);
});

confirmBtn.addEventListener('click', () => {
    if(mailInput.value != "" && NamePattern.test(firstNameInput.value) && NamePattern.test(secondNameInput.value) && numberInput.value.length === 18){
        cartItems = [];
        saveItemsToLocalStorage("cartItems", cartItems);
        updateOrderList();
        trackingShop();
        orderingList(false, orderList);
        orderingList(true, confirmedOrder);
    }  else{
        checkError();
        highlightErrorFields();
    }
});

function checkError(){
        validateField(firstNameInput, NamePattern, firstNameBlock);
        validateField(secondNameInput, NamePattern, secondNameBlock);
        addErrorMessage(numberBlock, numberInput.value.length !== 18 ? "Номер не вірний" : null);
        validateField(emailInput, emailPattern, emailBlock);
        validateField(mailInput, mailPattern, mailBlock);
}

function highlightErrorFields() {
    const inputBlocks = document.querySelectorAll('.input-block');

    inputBlocks.forEach(inputBlock => {
        const errorParagraphs = inputBlock.querySelectorAll('p');

        errorParagraphs.forEach(paragraph => {
            paragraph.classList.add('flash');  // Додавання класу для виклику анімації
        });

        setTimeout(() => {
            errorParagraphs.forEach(paragraph => {
                paragraph.classList.remove('flash');  // Видаленя класу для завершення анімації
            });
        }, 1000);
    });
}
}

export default ForShop
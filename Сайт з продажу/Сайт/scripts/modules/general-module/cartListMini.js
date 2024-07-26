import { calculationUtils , totalSumItems} from '../Utils/сalculationUtils.js';

let cartItems = [];

const cartListMini = document.querySelector('.box-added');
const btnCart = document.getElementById('btn-cart');
const ulBox = document.querySelector('.box-ul');
function addToCartListMini(product) {   
    let currentQuantity = 1;

    const li = document.createElement('li');
    const miniInfo = document.createElement('div');
    const img = document.createElement('img');
    const aName = document.createElement('a');
    const spanPrice = document.createElement('span');

    const quantityRemove = document.createElement('div');
    const quantity = document.createElement('div');
    const buttonMinus = document.createElement('button');
    const inputQuantity = document.createElement('input');
    const buttonPlus = document.createElement('button');
    
    const buttonRemove = document.createElement('button');
    
    miniInfo.classList.add("mini-info");
    quantityRemove.classList.add("quantity-remove");
    quantity.classList.add("quantity");

    buttonMinus.setAttribute('id', 'btn-minus');
    buttonPlus.setAttribute('id', 'btn-plus');
    buttonRemove.setAttribute('id', 'btn-remove');

    spanPrice.setAttribute('id', 'span-price');

    const priceString = product.price;
    const priceWithoutSymbol = priceString.replace('$', ''); // Видалення символу "$"
    const price = parseFloat(priceWithoutSymbol);

   
    img.src = product.mainImage;
    aName.textContent = product.name;
    aName.href = `product.html?id=${product.id}`; // Додаю посилання з ідентифікатором товару
    const calculate = currentQuantity * price ;
    spanPrice.textContent = `${calculate}$`;

    buttonMinus.textContent = "−";
    inputQuantity.type = "text";
    inputQuantity.value = 1;
    buttonPlus.textContent = "+";
    buttonRemove.textContent = "❌";
     
    calculationUtils(currentQuantity, price, spanPrice, inputQuantity, buttonMinus, buttonPlus, buttonRemove, li, cartItems, product, 1, cartListMini);
    
    quantity.append(buttonMinus, inputQuantity, buttonPlus)
    quantityRemove.append(quantity, buttonRemove)
    miniInfo.append(img, aName,spanPrice);
    li.append(miniInfo, quantityRemove)
    ulBox.append(li);
    totalSumItems();
    console.log()
}

function loadCartItemsFromLocalStorage() {
    const storedBucketItems = localStorage.getItem("cartItems");
    if (storedBucketItems) {
        cartItems = JSON.parse(storedBucketItems);
    }
}
loadCartItemsFromLocalStorage();

function btnClick() {
    btnCart.addEventListener("click", () => {
        let display = cartListMini.classList.contains('remove-cl')
        if(display){
            cartListMini.classList.remove('remove-cl'); 
            cartListMini.style.animation = 'cartListShow .7s forwards';
        } else{
            cartListMini.style.animation = 'cartListClose .7s forwards';
            setTimeout(() => {
            cartListMini.classList.add('remove-cl');
            }, 700)
        }
    });
    checkOverflow();
}
function checkOverflow(){ 
    if(ulBox){
        const liElements = ulBox.querySelectorAll('li');

        if (liElements.length >= 4) {
            cartListMini.style.overflowY = 'auto';
        } else {
            cartListMini.style.overflowY = 'hidden';
        }
    }
    
}
function checkCartListMini(cartItems){
    const pEmpty = cartListMini.querySelector("li")
    const h4Empty = cartListMini.querySelector("h4")
    if (cartItems.length > 0){
        pEmpty.classList.add("remove-cl")
        h4Empty.classList.remove("remove-cl")
    } else{
        pEmpty.classList.remove("remove-cl")
        h4Empty.classList.add("remove-cl")
    }
}

export { cartItems, addToCartListMini, btnClick, checkCartListMini, checkOverflow}
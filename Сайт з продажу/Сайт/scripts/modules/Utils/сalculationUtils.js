import {saveItemsToLocalStorage} from '../general-module/localStorage.js'; 
import { checkOverflow } from '../general-module/cartListMini.js';
import { updateOrderList } from '../forShop.js';
export function calculationUtils(currentQuantity, price, spanPrice, inputQuantity, buttonMinus, buttonPlus, buttonRemove, productDel, cartItems, product, cartList, cartListMini) {
    const updatePrice = () => {
        const calculate = currentQuantity * price;
        spanPrice.textContent = `${calculate}$`;
    };
    
    const updateQuantity = () => {
        inputQuantity.value = currentQuantity;
        currentQuantity = parseFloat(inputQuantity.value) || 1;
        updatePrice();
        totalSumItems();
    };
    inputQuantity.addEventListener('input', () =>{
        currentQuantity = inputQuantity.value = inputQuantity.value.replace(/[^0-9]/g, '');
        if(currentQuantity <= 0 ){
            inputQuantity.value = 1;
            currentQuantity = 1;
        } else if(currentQuantity > 999){
            inputQuantity.value = 999;
            currentQuantity = 999;
        }
        updatePrice();
        totalSumItems();
        if (window.location.pathname === '/shop-cart.html') {
            updateOrderList();
        }
    })
    
    function currentQuantityNum(forward = true){
        if(forward){
            currentQuantity += 1;
        } else{
            currentQuantity -= 1;
            if(currentQuantity <= 1){
                currentQuantity = 1;
            }
        }
        updateQuantity();
        totalSumItems();
        if (window.location.pathname === '/shop-cart.html') {
            updateOrderList();
        }
    }
    buttonMinus.addEventListener('click', () => currentQuantityNum(false));
    buttonPlus.addEventListener('click', () => currentQuantityNum());
    buttonRemove.addEventListener('click', () => {
        productDel.remove();
        const cartP = document.getElementById('cart-p-quantity');
        const indexToRemove = cartItems.findIndex(item => item.productId == product.id);
        const buttonBuyIdToRemove = 'btn-buy:prod-' + product.id; 
        console.log('Index to remove:', indexToRemove);
        if (indexToRemove !== -1) {
            cartItems.splice(indexToRemove, 1);
            saveItemsToLocalStorage("cartItems", cartItems);
            if(cartP){
                cartP.textContent = `(${cartItems.length})`;
            }
            // Знаходжу кнопку за ідентифікатором
            const buttonToRemove = document.getElementById(buttonBuyIdToRemove);
            // Оновлення вигляду кнопки
            if (buttonToRemove) {
                buttonToRemove.style.background = '#34b1da'; 
                buttonToRemove.style.cursor = 'pointer'; 
            }
            checkOverflow();
        }
        if (cartItems.length === 0) {
            if(cartList === 1){
                const pEmpty = cartListMini.querySelector("li.remove-cl");
                const h4Empty = cartListMini.querySelector("h4")
                pEmpty.classList.remove("remove-cl");
                h4Empty.classList.add("remove-cl")
            } else if(cartList === 2){
                const empty = document.querySelector(".empty-shop");
                const shopCart = document.querySelector(".shop-cart");
                empty.style.display = "block"
                shopCart.style.display = "none"
            }
        }
        totalSumItems();
        if (window.location.pathname === '/shop-cart.html') {
            updateOrderList();
        }
    });
}

export function totalSumItems() {
    const totalSum = document.getElementById("total-sum");
    const allPrices = document.querySelectorAll('#span-price');

    let total = 0;

    allPrices.forEach(priceElement => {
        const priceString = priceElement.textContent;
        const priceWithoutSymbol = priceString.replace('$', ''); // Видалення символ $
        const price = parseFloat(priceWithoutSymbol);
        total += price; 
    });
    totalSum.textContent = `${total.toFixed(2)}$`;
}

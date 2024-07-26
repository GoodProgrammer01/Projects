import {addToCartListMini, checkCartListMini} from './cartListMini.js';
import {renderWishList} from '../forWish.js'

const wishP = document.getElementById('wish-p-quantity');
const comparisonP = document.getElementById('comparison-p-quantity');
const storedWishItems = localStorage.getItem("wishItems");
const storedComparisonItems = localStorage.getItem("comparisonItems");
let wishItems = [];
let comparisonItems = [];

function loadComparisonFromLocalStorageQuantity() {
    const categoriesHead = document.querySelector('.comparison-head');
    const emptyBlock = document.querySelector('.empty-block');
    const categoriesComp = document.querySelector('.categories-comp');
    if (storedComparisonItems) {
        comparisonItems = JSON.parse(storedComparisonItems);
        comparisonItems.forEach(() => {
            comparisonP.textContent = `(${comparisonItems.length})`;         
        });
    if(emptyBlock) {
            if (comparisonItems.length > 0){
                emptyBlock.style.display = 'none';
            } 
            else{
                emptyBlock.style.display = 'block';
                if(categoriesHead){
                    categoriesComp.style.display = 'none';
                    categoriesHead.style.display = 'flex';
                }
            }
        }
    }
}
function loadWishFromLocalStorageQuantity() {
    if (storedWishItems) {
        wishItems = JSON.parse(storedWishItems);
        wishItems.forEach(() => {
            wishP.textContent = `(${wishItems.length})`;         
        });
    }
}

function loadWishFromLocalStorage() {
    if (storedWishItems) {
        wishItems = JSON.parse(storedWishItems);
        wishItems.forEach(item => {
            renderWishList(item.productData); 
            wishP.textContent = `(${wishItems.length})`;       
        });
    }
}
function loadBucketFromLocalStorage() {
    const cartP = document.getElementById('cart-p-quantity');
    const storedBucketItems = localStorage.getItem("cartItems");
    let cartItems;
    if (storedBucketItems) {
        cartItems = JSON.parse(storedBucketItems);
        cartItems.forEach(item => {       
            addToCartListMini(item.productData); // Додавання товарів до кошика
            cartP.textContent = `(${cartItems.length})`;
        });
    }
    checkCartListMini(cartItems);
} 

function saveItemsToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function checkWishList(){
    const wishEmpty = document.querySelector('.wishes-empty');
    if (storedWishItems) {
        wishItems = JSON.parse(storedWishItems);
        if (wishItems.length > 0){
            wishEmpty.style.display = 'none';
        } 
        else{
            wishEmpty.style.display = 'block';
        }
    } 
}

export {wishItems, comparisonItems, loadComparisonFromLocalStorageQuantity, loadWishFromLocalStorageQuantity, loadWishFromLocalStorage, loadBucketFromLocalStorage, saveItemsToLocalStorage, checkWishList }
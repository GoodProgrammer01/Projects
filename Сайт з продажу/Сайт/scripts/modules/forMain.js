import { fetchData } from './general-module/fetchData.js';
import { saveItemsToLocalStorage } from './general-module/localStorage.js';
import { btnClick, cartItems } from './general-module/cartListMini.js';
import { loadBucketFromLocalStorage, loadComparisonFromLocalStorageQuantity, loadWishFromLocalStorageQuantity } from './general-module/localStorage.js';
import { createProductElement } from './Utils/renderUtils.js';

const Goods = () => {
    saveItemsToLocalStorage("cartItems", cartItems);
    const arrowUp = document.querySelector("#arrow-up");
    const arrowDown = document.querySelector("#arrow-down");
    const productList = document.querySelector(".product-list");
    let displayedItemCount = 3;
    let allProducts = [];
    function renderGoods(itemCount){
        for (let i = 0; i < itemCount && i < allProducts.length; i++) {
            const currentProductData = allProducts[i];
            currentProductData.indexInAllProducts = i;
            const productElement = createProductElement(currentProductData);
            productList.appendChild(productElement);
        }
    }
    function fetchDataAndRender() {
        fetchData().then(data => {
            allProducts = data;
            renderGoods(displayedItemCount);
            arrowDown.addEventListener("click", () => {
                // Тут я зробив відслудковування скільки ще товарів залишилось відрендерити віднявши відрендерені товари від всіх 
                // Потім поставив умову що якщо кількість залишкових товарів більша за 0 то вони відрендеряться в межах від 1 до 3 в залежності скільки їх залишось 
                // Потім додав цю кількість товару яку відрендеримо до кількості вже відрендерених товарів
                const remainingProducts = allProducts.length - displayedItemCount;
                    if (remainingProducts > 0) {
                        const toDisplay = Math.min(3, remainingProducts);
                        displayedItemCount += toDisplay;

                        productList.innerHTML = "";
                        renderGoods(displayedItemCount);
                }
            });
            arrowUp.addEventListener("click", () => {
                const remainingProducts = displayedItemCount % 3;
                if (remainingProducts > 0) {
                    // Спочатку віднімати товари, які не кратні 3
                    displayedItemCount -= remainingProducts;
                } else {
                    // Потім віднімати по 3 товари
                    displayedItemCount -= 3;
                }
                if(displayedItemCount < 3){
                    displayedItemCount = 3;
                }
                if (displayedItemCount > 0) {
                    const productList = document.querySelector(".product-list");
                    productList.innerHTML = "";
                    renderGoods(displayedItemCount);
                }
            });
        });
    }
loadBucketFromLocalStorage();
loadWishFromLocalStorageQuantity();
btnClick();
fetchDataAndRender();;

};

export default Goods

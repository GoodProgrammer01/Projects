import { createButton, checkBackground } from './Utils/buttonUtils.js';
import { cartItems } from './general-module/cartListMini.js';
import { handleAddToCart, handleWishList } from './general-module/handleAdd.js';
import { handleReview } from './general-module/handleAdd.js';
import { wishItems } from './general-module/localStorage.js';

let searchProduct = [];
let filteredProducts = [];
let showProduct = 4;   
const productList = document.querySelector('.product-list');
const listStyle = document.getElementById('fl-list');
const gridStyle = document.getElementById('fl-grid');
const filterProduct = document.querySelector('.product-filter');
const emptyProduct = document.querySelector('.empty-product-list');
function saveCategory(){
    if (window.location.pathname === '/search.html') {
        const selectElement = document.querySelector('select[name="Categories"]');
        selectElement.addEventListener('change', function() {
            const selectedCategory = this.value;
            filterProducts(selectedCategory);
        });
    } else {
        sessionStorage.removeItem('filteredProducts');
        sessionStorage.removeItem('searchInputValue');
        sessionStorage.removeItem('searchProduct');
    }
}

function filterProducts(category) {
    filteredProducts = searchProduct.filter(product => {
        return category === "0" || product.type === category;
    });
    if(filteredProducts.length === 0){
        filterProduct.style.display = "none";
        emptyProduct.style.display = "block";
    } else{
        filterProduct.style.display = "flex";
        emptyProduct.style.display = "none";
    }
    // Збереження відфільтрованих товарів в сесійному сховищі
    sessionStorage.setItem('filteredProducts', JSON.stringify(filteredProducts));

    console.log(filteredProducts);
    renderSearchProduct(showProduct, filteredProducts);
}

function renderStyle(grid = true){
    if(grid){
        gridStyle.classList.add('fl-active');
        listStyle.classList.remove('fl-active');
        productList.classList.remove("fl-list");
    } else{
        gridStyle.classList.remove('fl-active');
        listStyle.classList.add('fl-active');
        productList.classList.add('fl-list');
    }
    renderSearchProduct(showProduct, filteredProducts);
}
function clickStyle(){
listStyle.addEventListener('click',() => renderStyle(false))
gridStyle.addEventListener('click',() => renderStyle())
}

function renderSearchProduct(itemCount, products){
    const flList = document.querySelector('.fl-list');
    productList.innerHTML = "";
    if(products !== null){
        for (let i = 0; i < itemCount && i < products.length; i++) {
            const currentProductData = products[i];

            const paddingDiv = document.createElement('div');
            const product = document.createElement('div');
            const aImg = document.createElement('a');
            const divCaption = document.createElement('div');
            const divProductName = document.createElement('div');
            const divBtnGroup = document.createElement('div');
            const divRating = document.createElement('div');

            const img = document.createElement('img');
            const h3 = document.createElement('h3');
            const a = document.createElement('a');
            const p = document.createElement('p');

            img.src = currentProductData.mainImage;
            img.alt = "Product Image";
            h3.textContent = currentProductData.price;
            a.textContent = currentProductData.name;
            a.href = `product.html?id=${currentProductData.id}`; 
            p.textContent = currentProductData.descriptionMini;
            
            let btnBuy;
            if(flList){
                btnBuy = createButton('В кошик', 'btn-buy', () => handleAddToCart(currentProductData));
            } else{
                btnBuy = createButton('🛒', 'btn-buy', () => handleAddToCart(currentProductData));
            }
            const btnWish = createButton('♡', 'btn-wish', () => handleWishList(currentProductData));
            const btnComparison = createButton('⇆', 'btn-comparison', () => handleComparison(currentProductData));
            const btnReview = createButton('👁', 'btn-review', () => handleReview(currentProductData));
            btnBuy.setAttribute('id', `btn-buy:prod-${currentProductData.id}`);
            btnReview.setAttribute('id', `btn-review:prod-${currentProductData.id}`);

            const isInCart = cartItems.some(item => item.productId === currentProductData.id);
            const isInWishlist = wishItems.some(item => item.productId === currentProductData.id);

            checkBackground (isInCart, btnBuy);
            checkBackground (isInWishlist, btnWish);

            paddingDiv.classList.add("product-padding");
            product.classList.add("product");
            aImg.classList.add("image");
            divCaption.classList.add("caption");
            divProductName.classList.add("product-name");
            divBtnGroup.classList.add("button-group");
            divRating.classList.add("rating");

            aImg.appendChild(img);
            divProductName.append(a, p);

            divBtnGroup.append(btnBuy, btnWish, btnComparison, btnReview);

            divCaption.append(h3, divProductName, divBtnGroup, divRating);
            product.append(aImg, divCaption);
            paddingDiv.appendChild(product);
            productList.appendChild(paddingDiv);
        }
    }
}; 
function showProductNumber(){
const selectElement = document.querySelector('.show-number');
selectElement.addEventListener('change', function() {
    const selectedValue = this.value; // Отримати значення обраної опції
    showProduct = selectedValue;  
    renderSearchProduct(showProduct, filteredProducts);
});
}
function loadSearchProductFromSessionStorage(){
    const storedSearchItems = sessionStorage.getItem("searchProduct");
    searchProduct = JSON.parse(storedSearchItems);
    
    const storedFilteredItems = sessionStorage.getItem("filteredProducts");
    if(storedFilteredItems){
        filteredProducts = JSON.parse(storedFilteredItems);
    } else {
        filteredProducts = searchProduct; // Зміна значення filteredProducts на searchProduct
        sessionStorage.setItem('filteredProducts', JSON.stringify(filteredProducts)); // Оновлення сесійного сховища
    }
    if(filteredProducts !== null){
        if(filteredProducts.length > 0){
            filterProduct.style.display = "flex";
            emptyProduct.style.display = "none";
        } 
    }
    console.log(searchProduct)
    renderSearchProduct(showProduct, searchProduct);
}

function clickSort(){
    document.querySelector('select[name="product-sorting"]').addEventListener('change', function() {
        const selectedValue = this.value;
        filteredProducts = sortProducts(filteredProducts, selectedValue);

        renderSearchProduct(showProduct, filteredProducts);
    });
}
function sortProducts(products, sortBy) {
    const sortedProducts = [...products];
    switch (sortBy) {
        case 'nameUp':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'nameDown':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'priceUp':
            sortedProducts.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
            break;
        case 'priceDown':
            sortedProducts.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
            break;
        default:
            // Якщо вибране значення не співпадає з варіантами, повернення оригінального масиву
            return products;
    }
    return sortedProducts;
}
export {saveCategory, showProductNumber, clickStyle, loadSearchProductFromSessionStorage, clickSort}
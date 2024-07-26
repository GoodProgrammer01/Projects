import { loadBucketFromLocalStorage, loadWishFromLocalStorageQuantity, loadComparisonFromLocalStorageQuantity } from './modules/general-module/localStorage.js';
import { btnClick } from './modules/general-module/cartListMini.js';
import searchModule from './modules/general-module/searchInput.js';
import { saveCategory, showProductNumber, clickStyle, loadSearchProductFromSessionStorage, clickSort } from './modules/forSearch.js';

document.addEventListener('DOMContentLoaded', function() {  
    loadComparisonFromLocalStorageQuantity();
    loadWishFromLocalStorageQuantity();
    loadBucketFromLocalStorage();
    btnClick();
    loadSearchProductFromSessionStorage();
    searchModule();
    saveCategory();
    showProductNumber();
    clickStyle();
    clickSort();
    const searchButton = document.querySelectorAll('#search-button');
    searchButton.forEach(item => {
        item.addEventListener('click', () => {
        sessionStorage.removeItem('filteredProducts');
        });
    });
});

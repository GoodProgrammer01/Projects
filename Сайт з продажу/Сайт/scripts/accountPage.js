import { loadBucketFromLocalStorage, loadWishFromLocalStorageQuantity, loadComparisonFromLocalStorageQuantity } from './modules/general-module/localStorage.js';
import { btnClick } from './modules/general-module/cartListMini.js';
import searchModule from './modules/general-module/searchInput.js';
import { saveCategory } from './modules/forSearch.js';

document.addEventListener('DOMContentLoaded', function() {  
    loadComparisonFromLocalStorageQuantity();
    loadWishFromLocalStorageQuantity();
    loadBucketFromLocalStorage();
    saveCategory();
    btnClick();
    searchModule();
});
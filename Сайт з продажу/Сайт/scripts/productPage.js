import { loadBucketFromLocalStorage, loadWishFromLocalStorageQuantity, loadComparisonFromLocalStorageQuantity } from './modules/general-module/localStorage.js';
import { btnClick } from './modules/general-module/cartListMini.js';
import renderProduct from './modules/forProduct.js';
import searchModule from './modules/general-module/searchInput.js';
import { callAnimationForReview } from './modules/general-module/animation.js';
import { saveCategory } from './modules/forSearch.js';

document.addEventListener('DOMContentLoaded', function() {   
    callAnimationForReview();
    loadComparisonFromLocalStorageQuantity();
    loadWishFromLocalStorageQuantity();
    loadBucketFromLocalStorage();
    saveCategory();
    btnClick();
    renderProduct();
    searchModule();   
});
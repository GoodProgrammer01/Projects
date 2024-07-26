import ForShop from './modules/forShop.js';
import searchModule from './modules/general-module/searchInput.js';
import { loadWishFromLocalStorageQuantity, loadComparisonFromLocalStorageQuantity } from './modules/general-module/localStorage.js';
import { saveCategory } from './modules/forSearch.js';
import { callAnimationForReview } from './modules/general-module/animation.js';

document.addEventListener('DOMContentLoaded', function() {
    callAnimationForReview();
    loadComparisonFromLocalStorageQuantity();
    saveCategory();
    ForShop();
    searchModule();
    loadWishFromLocalStorageQuantity();
});
import forMain from './modules/forMain.js';
import { callAnimation } from './modules/general-module/animation.js';
import searchModule from './modules/general-module/searchInput.js';
import { loadComparisonFromLocalStorageQuantity } from './modules/general-module/localStorage.js';
import { saveCategory } from './modules/forSearch.js';

document.addEventListener('DOMContentLoaded', function() {
    loadComparisonFromLocalStorageQuantity();
    callAnimation();
    saveCategory();
    forMain();   
    searchModule();
});


















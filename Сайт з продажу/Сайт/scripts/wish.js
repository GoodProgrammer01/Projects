import searchModule from './modules/general-module/searchInput.js';
import {loadBucketFromLocalStorage, loadWishFromLocalStorage, checkWishList, loadComparisonFromLocalStorageQuantity} from './modules/general-module/localStorage.js';
import {btnClick} from './modules/general-module/cartListMini.js';
import {addRemoveButton, deleteWish} from './modules/forWish.js';
import {saveCategory} from './modules/forSearch.js';

document.addEventListener('DOMContentLoaded', function() {
    loadComparisonFromLocalStorageQuantity();
    loadBucketFromLocalStorage();
    loadWishFromLocalStorage();
    saveCategory();
    searchModule();
    addRemoveButton();
    checkWishList();
    btnClick();
    deleteWish();
});

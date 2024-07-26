import { createButton, checkBackground } from './buttonUtils.js';
import { comparisonItems } from '../general-module/localStorage.js';
import { handleAddToCart, handleWishList, handleComparison, handleReview } from '../general-module/handleAdd.js';
import { wishItems } from '../general-module/localStorage.js';
import { cartItems } from '../general-module/cartListMini.js';
function createProductElement(productData) {
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

    img.src = productData.mainImage;
    img.alt = "Product Image";
    h3.textContent = productData.price;
    a.textContent = productData.name;
    a.href = `product.html?id=${productData.id}`; // Додаю посилання з ідентифікатором товару
    p.textContent = productData.descriptionMini;

    const btnBuy = createButton('🛒', 'btn-buy', () => handleAddToCart(productData));
    const btnWish = createButton('♡', 'btn-wish', () => handleWishList(productData));
    const btnComparison = createButton('⇆', 'btn-comparison', () => handleComparison(productData));
    const btnReview = createButton('👁', 'btn-review', () => handleReview(productData));

    btnBuy.setAttribute('id', `btn-buy:prod-${productData.id}`);
    btnReview.setAttribute('id', `btn-review:prod-${productData.id}`);

    const isInCart = cartItems.some(item => item.productId === productData.id);
    const isInWishlist = wishItems.some(item => item.productId === productData.id);
    const isInComparisonlist = comparisonItems.some(item => item.productId === productData.id);

    checkBackground(isInCart, btnBuy);
    checkBackground(isInWishlist, btnWish);
    checkBackground(isInComparisonlist, btnComparison);

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

    return paddingDiv;
}

export {createProductElement}
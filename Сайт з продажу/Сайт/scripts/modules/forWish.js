import { loadWishFromLocalStorageQuantity } from './general-module/localStorage.js';
import { createProductElement } from './Utils/renderUtils.js';
import { createButton } from './Utils/buttonUtils.js';

function renderWishList(productWishes) {
    const productList = document.querySelector('.product-list');
    const productElement = createProductElement(productWishes);
    productList.appendChild(productElement);
}
function addRemoveButton(){
    const buttonGroup = document.querySelectorAll('.button-group');
    if(buttonGroup){
        buttonGroup.forEach(item => {
            const btnRemove = createButton('⋮', 'btn-remove',() => {});
            item.appendChild(btnRemove);
        })
    }
}
function deleteWish() {
    const buttonRemove = document.querySelectorAll('.btn-remove');
    const wishP = document.getElementById('wish-p-quantity');
    buttonRemove.forEach((item, index) => {
        item.addEventListener('click', () => {   
            const product = item.closest('.product-padding');
    
            if (product) {
                const existingRemoveBlock = product.querySelector('.remove-product');
    
                if (!existingRemoveBlock) {
                    const divRemove = document.createElement('div');
                    const buttonDelete = document.createElement('button');
                    const buttonExit = document.createElement('button');
    
                    item.style.background = '#2f2f2f';
                    item.style.color = '#fff';
                    buttonDelete.textContent = "Видалити";
                    buttonExit.textContent = "×";
                    
                    divRemove.classList.add('remove-product');
                    
                    divRemove.append(buttonDelete, buttonExit);
                    product.appendChild(divRemove);
    
                    buttonExit.addEventListener('click', () => {
                        divRemove.remove();
                        item.style.background = '';
                        item.style.color = '';
                    });
                    buttonDelete.addEventListener('click', () => {
                        const storedWishItems = JSON.parse(localStorage.getItem("wishItems"));
                        const indexToRemove = Array.from(product.parentElement.children).indexOf(product);
                        
                        storedWishItems.splice(indexToRemove, 1);
                        
                        localStorage.setItem("wishItems", JSON.stringify(storedWishItems));
                        
                        product.remove();
                        loadWishFromLocalStorageQuantity();
                        wishP.textContent = `(${storedWishItems.length})`;
                        if(storedWishItems.length === 0){
                            const wishesEmpty = document.querySelector('.wishes-empty');
                            wishesEmpty.style.display = "block";   
                        }
                    });
                }
            }
        });
    });
}
        
export { renderWishList, addRemoveButton, deleteWish }   
    

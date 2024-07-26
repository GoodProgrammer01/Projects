import { loadWishFromLocalStorageQuantity, loadComparisonFromLocalStorageQuantity } from '../general-module/localStorage.js';

function createButton(text, className, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = className;
    button.addEventListener('click', () => {
        onClick(button); 
        button.style.background = '#2f2f2f'; 
        button.style.color = '#fff'; 
    });
    button.originalClass = className;
    return button;
}

function checkBackground(state, button) {
    if (state) {
        button.classList.add('act-backg');
        button.style.cursor = 'default';
    } else {
        button.classList.remove('act-backg');
        button.style.cursor = '';
    }
}
function checkBackgroundForReview(state, button) {
    if (state) {
        button.style.color = '#2f2f2f';
        button.style.cursor = 'default';
    } else {
        button.style.color = '';
        button.style.cursor = '';
    }
}

function deleteProductButton(closClass, productP, items, emptyArray) {
    const buttonRemove = document.querySelectorAll('.btn-remove');
    buttonRemove.forEach((item, index) => {
        item.addEventListener('click', () => {  
            const product = item.closest(closClass);

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
                        // Отримую id товару з кнопки
                        const buttonId = item.id.split(':')[1]; // Отримуємо "prod-3"
                        const productId = buttonId.split('-')[1]; // Отримуємо "3"
                  
                        // Отримую збережені товари з локального сховища
                        const storedItems = JSON.parse(localStorage.getItem(items));
                        
                        // Знаходжу індекс товару за id
                        const indexToRemove = storedItems.findIndex(item => item.productData.id === parseInt(productId));
                        console.log(indexToRemove)
                        console.log(buttonId)
                        if (indexToRemove !== -1) {
                            storedItems.splice(indexToRemove, 1);
                            localStorage.setItem(items, JSON.stringify(storedItems));
                            product.remove();
                            loadWishFromLocalStorageQuantity();
                            loadComparisonFromLocalStorageQuantity();
                            console.log(emptyArray)

                            productP.textContent = `(${storedItems.length})`;
                            if (emptyArray.length === 0) {
                                const emptyBlock = document.querySelector('.empty-block');
                                
                                if (emptyBlock) {
                                    emptyBlock.style.display = "block";   
                                }
                            }
                        }
                    });
                }
            }
        });
    });
}


export { createButton, checkBackground, checkBackgroundForReview, deleteProductButton};

import { sortedProducts } from './forComparisonCategories.js';
import { createButton, deleteProductButton } from './Utils/buttonUtils.js';

function renderComparisonProduct(products) {
    const ulProduct = document.querySelector('.product-comparison');

    const li = document.createElement('li');
    const descriptionBlock = document.createElement('div');
    const backBlock = document.createElement('div');
    const h4PriceName = document.createElement('h4');
    
    descriptionBlock.classList.add('description-product');
    backBlock.classList.add('back-block');
    h4PriceName.textContent = 'Ціна';
    if(products.length !== 0){
        const firstProductCharacteristics = products[0].productData.Characteristics;
            // Додаю назви характеристик до загального блоку
            for (const key in firstProductCharacteristics) {
                const h4CharacteristicName = document.createElement('h4');
                h4CharacteristicName.textContent = key;
                descriptionBlock.appendChild(h4CharacteristicName);
            }
            descriptionBlock.appendChild(h4PriceName);
        li.append(backBlock, descriptionBlock);
        ulProduct.appendChild(li);
        
        products.forEach(item => {
            const li = document.createElement('li');
            const imageBlock = document.createElement('div');
            const descriptionBlock = document.createElement('div');
            const btnRemove = createButton('⋮', 'btn-remove',() => {});
            const img = document.createElement('img');
            const nameBlock = document.createElement('div');
            const aName = document.createElement('a');

            img.src = item.productData.mainImage;
            aName.textContent = item.productData.name;
            aName.href = `product.html?id=${item.productData.id}`;

            li.classList.add('li-comparison-product');
            imageBlock.classList.add('image');
            nameBlock.classList.add('name-block');
            descriptionBlock.classList.add('description-product');

            btnRemove.setAttribute('id', `btn-review:prod-${item.productData.id}`);

            const characteristics = item.productData.Characteristics;
            for (const key in characteristics) {
                const h4Characteristic = document.createElement('h4');
                h4Characteristic.textContent = `${characteristics[key]}`;
                descriptionBlock.appendChild(h4Characteristic);
            }
            const h4Price = document.createElement('h4');
            h4Price.textContent = item.productData.price;
            nameBlock.appendChild(aName);
            imageBlock.append(img, nameBlock, btnRemove);
            descriptionBlock.appendChild(h4Price);
            li.append(imageBlock, descriptionBlock);
            ulProduct.appendChild(li);
        });
    }
}
let filteredProducts = [];
function renderComparison() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    filteredProducts = sortedProducts
        .filter(product => Object.keys(product)[0] === type)
        .flatMap(productTypeObj => Object.values(productTypeObj))
        .flatMap(productArray => productArray);
    console.log(filteredProducts);
    renderComparisonProduct(filteredProducts);
    const comparisonP = document.getElementById('comparison-p-quantity');
    const items = "comparisonItems";
    deleteProductButton(".li-comparison-product", comparisonP, items, filteredProducts);
    if(filteredProducts.length === 0){
        const emptyBlock = document.querySelector('.empty-block');                   
        if (emptyBlock) {
            emptyBlock.style.display = "block";   
        }
    }
}

export {renderComparison}
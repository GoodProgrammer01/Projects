
let comparisonItems = []; // Оголошую глобальну змінну comparisonItems

function loadComparisonFromLocalStorageQuantity() {
    const storedComparisonItems = localStorage.getItem("comparisonItems"); // Отримую дані з локального сховища
    if (storedComparisonItems) {
        comparisonItems = JSON.parse(storedComparisonItems); // Розпаковую збережені товари з локального сховища
    }
}
loadComparisonFromLocalStorageQuantity();

function sortProductsByType(products) {
    const sortedProducts = [];
    products.forEach(product => {
        const type = product.productData.type;
        const existingTypeIndex = sortedProducts.findIndex(item => Object.keys(item)[0] === type);

        if (existingTypeIndex !== -1) {
            sortedProducts[existingTypeIndex][type].push(product);
        } else {
            const newTypeObj = {};
            newTypeObj[type] = [product];
            sortedProducts.push(newTypeObj);
        }
    });

    return sortedProducts;
}

 // Завантажую товари з локального сховища
const sortedProducts = sortProductsByType(comparisonItems); // Сортую товари за типом

function displayProductCountsByType(products) {
    const productCounts = {}; // Об'єкт для збереження кількості товарів за типом
    console.log(sortedProducts)
    // Знаходжу кількість товарів кожного типу
    products.forEach(category => {
        for (const type in category) {
            const productsOfType = category[type];
            productCounts[type] = productsOfType.length;
        }
        console.log(category);
    });

    // Додаю span для кожного типу товарів разом з кількістю
    const categoriesUl = document.getElementById('categories');
    for (const type in productCounts) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = `${type}(${productCounts[type]})`;
        a.href = `comparison.html?type=${type}`; // Додаю посилання з ідентифікатором товару
        li.appendChild(a);
        categoriesUl.appendChild(li);
    }
}

export {sortedProducts, displayProductCountsByType}
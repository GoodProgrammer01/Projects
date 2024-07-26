import { fetchData } from './fetchData.js';
let allProducts = [];

const searchModule = () => {
    const resultSearch = document.querySelector(".search-result");
    const resultSearchUl = resultSearch.querySelector("ul");
    const resultInput = document.getElementById("search-input");
    const resultInputCrit = document.getElementById("search-input-crit");

    let searchInputValue = sessionStorage.getItem("searchInputValue") || "";

    function fetchDataAndRender() {
        return fetchData().then((data) => {
            allProducts = data;
            return allProducts;
        });
    }

    function searchByInputValue(inputValue, searchProduct) {
        allProducts.forEach((item) => {
            const itemNameWords = item.name.toLowerCase().split(" ");
            const isMatch = itemNameWords.some((word) => word.startsWith(inputValue));

            if (isMatch) {
                // Перевірка, чи товар вже є в searchProduct
                const isAlreadyAdded = searchProduct.some((existingItem) => existingItem.id === item.id);

                if (!isAlreadyAdded) {
                    searchProduct.push(item);
                }
            }
        });
    }

    function searchList(inputElement) {
        const inputValue = inputElement.value.trim().toLowerCase();
        searchInputValue = inputValue; // Оновлюю значення введеного тексту

        let searchProduct = [];
        if (inputValue !== "") {
            searchByInputValue(inputValue, searchProduct);
        }

        // Оновлення sessionStorage після пошуку
        sessionStorage.setItem("searchProduct", JSON.stringify(searchProduct));
        sessionStorage.setItem("searchInputValue", searchInputValue);

        if (inputElement === resultInput) {
            renderSearchList(searchProduct);
        }
    }

    if (resultInputCrit) {
        resultInputCrit.addEventListener("input", () => searchList(resultInputCrit));
    }
    resultInput.addEventListener("input", () => searchList(resultInput));
    resultInput.value = searchInputValue;
    if (resultInputCrit) {
        resultInputCrit.value = searchInputValue;
    }
    function renderSearchList(items) {
        resultSearchUl.innerHTML = "";

        items.forEach((item) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            const img = document.createElement("img");
            const p = document.createElement("p");

            a.href = `product.html?id=${item.id}`;
            img.src = item.mainImage;
            p.textContent = item.name;

            a.append(img, p);
            li.appendChild(a);
            resultSearchUl.appendChild(li);
        });

        if (items.length > 0) {
            resultSearch.style.display = "flex";
        } else {
            resultSearch.style.display = "none";
        }
    }
 
    fetchDataAndRender();
};

export default searchModule;

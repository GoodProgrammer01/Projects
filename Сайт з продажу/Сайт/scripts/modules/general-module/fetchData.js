async function fetchData() {
    try {
        const response = await fetch('http://127.0.0.1:3000/products.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Помилка:', error);
    }
}

export { fetchData };

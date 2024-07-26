const usdSpan = document.querySelector(".usd-span");
const eurSpan = document.querySelector(".eur-span");
const gbpSpan = document.querySelector(".gbp-span");
const inputFrom = document.querySelector('.exchangeable input');
const inputTo = document.querySelector('.exchanged input');
const selectFrom = document.querySelector('.exchangeable select');
const selectTo = document.querySelector('.exchanged select');

fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
  .then(response => response.json())
  .then(json => { 

    const usd = json.find(currency => currency.cc === 'USD'); 
    const eur = json.find(currency => currency.cc === 'EUR'); 
    const gbp = json.find(currency => currency.cc === 'GBP'); 

    usdSpan.textContent = usd.rate; 
    eurSpan.textContent = eur.rate; 
    gbpSpan.textContent = gbp.rate; 

    function convertCurrency() {
      const fromCurrency = selectFrom.value;
      const toCurrency = selectTo.value;
      const amount = parseFloat(inputFrom.value);
      
      let exchangeRateFrom = 1; // Обмінний курс гривні так як це в нас основна валюта
      if (fromCurrency !== 'UAH') { 
        exchangeRateFrom = json.find(currency => currency.cc === fromCurrency)?.rate || 1; 
      } 
      const exchangeRateTo = json.find(currency => currency.cc === toCurrency)?.rate || 1; 
        if (!isNaN(amount)) { //
        let result;//
        if (toCurrency === 'UAH') {
          result = amount * exchangeRateFrom;
        } 
        else {
          result = amount * (exchangeRateFrom / exchangeRateTo); 
        }
        inputTo.value = result.toFixed(2); 
      } else {
        inputTo.value = ''; 
      }
    }
    
    selectFrom.addEventListener('change', convertCurrency); 
    inputFrom.addEventListener('input', convertCurrency); 
    selectTo.addEventListener('change', convertCurrency); 
    inputTo.addEventListener('input', convertCurrency); 
  });
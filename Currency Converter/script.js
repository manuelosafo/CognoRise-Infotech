document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertButton = document.getElementById('convert');
    const resultDiv = document.getElementById('result');

    const apiKey = '69dae22a2d4e4162fb326edf'; // Replace with your ExchangeRate-API key
    const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.textContent = currency;
                fromCurrencySelect.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency;
                optionTo.textContent = currency;
                toCurrencySelect.appendChild(optionTo);
            });
        })
        .catch(error => console.error('Error fetching exchange rates:', error));

    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const conversionURL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

        fetch(conversionURL)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rate;
                const result = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
            })
            .catch(error => console.error('Error fetching conversion rate:', error));
    });
});

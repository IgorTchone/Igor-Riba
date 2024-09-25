document.getElementById('swap-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    const inputAmount = parseFloat(document.getElementById('input-amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
  
    // Validate input amount
    if (isNaN(inputAmount) || inputAmount <= 0) {
      alert("Please enter a valid amount to send.");
      return;
    }
  
    const conversionRates = {
      "USD": { "EUR": 0.85, "GBP": 0.75, "BRL": 5.25 },
      "EUR": { "USD": 1.18, "GBP": 0.88, "BRL": 6.18 },
      "GBP": { "USD": 1.33, "EUR": 1.13, "BRL": 7.02 },
      "BRL": { "USD": 0.19, "EUR": 0.16, "GBP": 0.14 }
    };
  
    let outputAmount;
    // Calculate converted amount
    if (fromCurrency === toCurrency) {
      outputAmount = inputAmount;
    } else {
      const conversionRate = conversionRates[fromCurrency][toCurrency];
      outputAmount = inputAmount * conversionRate;
    }
  
    document.getElementById('output-amount').value = outputAmount.toFixed(2); // Display converted amount
  });
  
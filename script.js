const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const amount = document.getElementById("amount");

// Load currency options
async function loadCurrencies() {
  const res = await fetch("https://api.frankfurter.app/currencies");
  const data = await res.json();

  for (let code in data) {
    let option1 = document.createElement("option");
    option1.value = code;
    option1.textContent = `${code} - ${data[code]}`;
    fromCurrency.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = code;
    option2.textContent = `${code} - ${data[code]}`;
    toCurrency.appendChild(option2);
  }

  // Default values
  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}

loadCurrencies();

// Convert function
async function convertCurrency() {
  let amt = amount.value;
  if (amt === "" || amt <= 0) {
    result.textContent = "⚠️ Please enter a valid amount!";
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (from === to) {
    result.textContent = "⚠️ Please choose different currencies!";
    return;
  }

  const res = await fetch(`https://api.frankfurter.app/latest?amount=${amt}&from=${from}&to=${to}`);
  const data = await res.json();

  result.textContent = `${amt} ${from} = ${data.rates[to]} ${to}`;
}

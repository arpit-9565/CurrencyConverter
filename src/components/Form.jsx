import React, { useState, useEffect } from 'react';
import './Form.css'; // Import the CSS file

const Form = () => {
  const [currencyType, setCurrencyType] = useState({});
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState();
  const [convertedAmount, setConvertedAmount] = useState(null);

  async function currencyTypes() {
    const apiData = await fetch('https://api.frankfurter.app/currencies');
    const res = await apiData.json();
    setCurrencyType(res);
  }

  useEffect(() => {
    currencyTypes();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    const apiData = await fetch(
      `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
    );
    const res = await apiData.json();
    setConvertedAmount(res.rates[toCurrency]);
  }

  function swapHandler() {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Currency Converter</h2>
        <form onSubmit={submitHandler}>
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            <option value="">Select Currency</option>
            {Object.entries(currencyType).map(([code, name]) => (
              <option key={code} value={code}>
                {name} ({code})
              </option>
            ))}
          </select>
          <button type="button" onClick={swapHandler}>Swap</button>
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            <option value="">Select Currency</option>
            {Object.entries(currencyType).map(([code, name]) => (
              <option key={code} value={code}>
                {name} ({code})
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button type="submit">Convert</button>
        </form>
        {convertedAmount !== null && (
          <div className="result">
            Converted Amount: {convertedAmount}
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;

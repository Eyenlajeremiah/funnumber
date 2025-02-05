const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

app.use(cors()); // Enable CORS for all routes

app.get('/api/classify-number', async (req, res) => {
  const numberParam = req.query.number;

  if (!numberParam) {
    return res.status(400).json({ number: null, error: true, message: "Number parameter is required" });
  }

  const number = parseInt(numberParam);

  if (isNaN(number)) {
    return res.status(400).json({ number: numberParam, error: true, message: "Invalid number provided" });
  }

  try {
    const funFactResponse = await axios.get(`http://numbersapi.com/${number}/math`);
    const funFact = funFactResponse.data;

    const isPrime = isNumberPrime(number);
    const isPerfect = isNumberPerfect(number);
    const properties = determineProperties(number);
    const digitSum = calculateDigitSum(number);

    res.json({
      number: number,
      is_prime: isPrime,
      is_perfect: isPerfect,
      properties: properties,
      digit_sum: digitSum,
      fun_fact: funFact,
    });
  } catch (error) {
      console.error("Error fetching fun fact:", error);
      res.status(500).json({ number: number, error: true, message: "Error fetching fun fact from Numbers API" });
  }
});


function isNumberPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  
  function isNumberPerfect(num) {
    if (num <= 1) return false;
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        sum += i;
        if (i * i !== num) sum += num / i;
      }
    }
    return sum === num;
  }
  

function determineProperties(num) {
    const isArmstrong = isArmstrongNumber(num);
    const isOdd = num % 2 !== 0;

    if (isArmstrong && isOdd) {
        return ["armstrong", "odd"];
    } else if (isArmstrong && !isOdd) {
        return ["armstrong", "even"];
    } else if (!isArmstrong && isOdd) {
        return ["odd"];
    } else {
        return ["even"];
    }
}

function isArmstrongNumber(num) {
    const numStr = String(num);
    const n = numStr.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += Math.pow(parseInt(numStr[i]), n);
    }
    return sum === num;
}

function calculateDigitSum(num) {
    const numStr = String(num);
    let sum = 0;
    for (let i = 0; i < numStr.length; i++) {
        sum += parseInt(numStr[i]);
    }
    return sum;
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


module.exports = app; // For testing
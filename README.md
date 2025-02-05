# Number Classification API

This API takes a number as input and returns interesting mathematical properties about it, along with a fun fact obtained from the Numbers API.

## API Specification

### Endpoint

GET https://funnumber.onrender.com/api/classify-number?number=371

### Request Parameters

*   number (required): An integer.

### Response (200 OK)

`json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}

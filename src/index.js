const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;


const user_info = {
  user_id: 'ajay_karode_13102001',
  email: 'ak3566@srmist.edu.in',
  roll_number: 'RA2011003010425',
};


function findHighestAlphabet(alphabets) {
  if (!alphabets.length) {
    return [];
  }
  return [alphabets.reduce((a, b) => (a > b ? a : b))];
}

app.use(bodyParser.json());


app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid 'data' in the request" });
    }

    const numbers = data.filter((x) => !isNaN(x));
    const alphabets = data.filter((x) => /^[A-Za-z]$/.test(x));

   
    const highest_alphabet = findHighestAlphabet(alphabets);

    const response_data = {
      is_success: true,
      ...user_info,
      numbers,
      alphabets,
      highest_alphabet,
    };

    res.json(response_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ is_success: false, error: 'Internal Server Error' });
  }
});


app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


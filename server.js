const express = require('express');
const app = express();

app.get('/api/customers', (req, res) => {
  let customers = [
    {
      id: 1,
      name: 'John',
      email: 'john@fakeemail.com',
      age: 23
    },
    {
      id: 2,
      name: 'Bill',
      email: 'bill@fakeemail.com',
      age: 24
    }
  ];

  res.json(customers);
});

const port = 5000;
app.listen(port, () => console.log('Server started on port: ' + port));

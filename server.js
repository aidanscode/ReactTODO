const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set('trust proxy', true);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let db = mongoose.connection;
db.on('error', () => {
  throw new Error('Database error occurred, ending program...');
});
db.once('open', () => console.log('Connection has been made!'));

require('./routes')(app);

const port = 5000;
app.listen(port, () => console.log('Server started on port: ' + port));

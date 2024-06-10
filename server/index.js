// Import packages
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Allow cross origin resource fetching
app.use(cors());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let complete = true;
app.post('/complete', (req, res) => {
  const { data } = req.body;
  try {
    if (data === true || data === false) {
      complete = data;
    } else throw new Error('Boolean value expected');
  } catch (err) {
    res.status(400).json(err);
  } finally {
    res.json(data);
  }
});

app.get('/complete', (req, res) => res.json(complete));

// Import and use routes
app.use('/servo', require('./routes/api/servo'));
app.use('/weight', require('./routes/api/weight'));
app.use('/pvc', require('./routes/api/pvc'));
app.use('/users', require('./routes/api/users'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`\nServer started on port ${PORT}`));

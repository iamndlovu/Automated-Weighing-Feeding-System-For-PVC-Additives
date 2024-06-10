const router = require('express').Router();

let selected = 0;

router.route('/').get(async (req, res) => {
  try {
    res.json(selected);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/').post(async (req, res) => {
  const { data } = req.body();
  try {
    selected = Number(data);
    if (!isNaN(selected)) throw new Error('Selected not a number');
    else if (selected < 0 || selected > 5)
      throw new Error('Selected out of range');
    else res.json(selected);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;

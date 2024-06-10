const router = require('express').Router();

let weight = 0.0;

router.route('/').get(async (req, res) => {
  try {
    res.json(weight);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/').post(async (req, res) => {
  const { data } = req.body();
  try {
    const _weight = Number(data);
    if (!isNaN(weight)) throw new Error('weight not a number');
    else if (weight < 0) throw new Error('weight -ve');
    else {
      weight = _weight;
      res.json(weight);
    }
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;

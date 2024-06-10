const router = require('express').Router();
let servo1Status = false,
  servo2Status = false,
  servo3Status = false;

router.route('/').get(async (req, res) => {
  try {
    res.json([servo1Status, servo2Status, servo3Status]);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/').post(async (req, res) => {
  const { status, servo } = req.body;

  try {
    switch (Number(servo)) {
      case 1:
        servo1Status = status;
        break;
      case 2:
        servo2Status = status;
        break;
      case 3:
        servo3Status = status;
        break;
      default:
        throw new Error('invalid servo number');
    }

    res.json({ servo1Status, servo2Status, servo3Status });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;

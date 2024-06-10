const router = require('express').Router();

const users = [
  {
    email: 'admin@example.mail',
    password: '12345',
    fullName: 'System Administrator',
  },
];

router.route('/').get(async (req, res) => {
  try {
    res.json(users);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;

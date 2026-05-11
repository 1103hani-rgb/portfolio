const express = require('express');
const router = express.Router();
const db = require('../config/db');
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await db.query(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    res.status(201).json({ message: 'Message received!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
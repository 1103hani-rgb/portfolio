const express = require('express');
const router = express.Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/', async (req, res) => {
  const { title, description, tech, category, github_url, live_url } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO projects (title, description, tech, category, github_url, live_url) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, tech, category, github_url, live_url]
    );
    res.status(201).json({ id: result.insertId, message: 'Project created!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
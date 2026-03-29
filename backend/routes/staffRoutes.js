const express = require('express');
const db = require('../db');

const router = express.Router();

// POST /api/staff — add a new staff member
router.post('/', async (req, res) => {
  const { name, staff_type, experience, base_salary, status } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO staff (name, staff_type, experience, base_salary, status) VALUES (?, ?, ?, ?, ?)',
      [name, staff_type, experience, base_salary, status]
    );
    res.status(201).json({ message: 'Staff added', staff_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/staff — get all staff
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM staff');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/staff/:id — get single staff by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM staff WHERE staff_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
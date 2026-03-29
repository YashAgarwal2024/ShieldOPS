const express = require('express');
const db = require('../db');

const router = express.Router();

// POST /api/attendance — add monthly attendance for a staff member
router.post('/', async (req, res) => {
  const { staff_id, contract_id, month, year, present_days } = req.body;
  if (present_days > 30) {
    return res.status(400).json({ error: 'Present days cannot be more than 30' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO attendance (staff_id, contract_id, month, year, present_days) VALUES (?, ?, ?, ?, ?)',
      [staff_id, contract_id, month, year, present_days]
    );
    res.status(201).json({ message: 'Attendance added', attendance_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/attendance — get all attendance records
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM attendance');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/attendance/:id — get single attendance by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM attendance WHERE attendance_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
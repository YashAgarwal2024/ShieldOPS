const express = require('express');
const db = require('../db');

const router = express.Router();

// POST /api/deployments — assign staff to a contract
router.post('/', async (req, res) => {
  const { staff_id, contract_id, shift, duty_start, duty_end } = req.body;
  try {
    // Check for overlapping shifts
    const [conflicts] = await db.query(
      'SELECT * FROM deployment WHERE staff_id = ? AND contract_id = ? AND duty_start < ? AND duty_end > ?',
      [staff_id, contract_id, duty_end, duty_start]
    );
    if (conflicts.length > 0) {
      return res.status(400).json({ error: 'Staff already deployed in this shift' });
    }
    // Insert deployment
    const [result] = await db.query(
      'INSERT INTO deployment (staff_id, contract_id, shift, duty_start, duty_end) VALUES (?, ?, ?, ?, ?)',
      [staff_id, contract_id, shift, duty_start, duty_end]
    );
    res.status(201).json({ message: 'Deployment added', deployment_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/deployments — get all deployments
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM deployment');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/deployments/:id — get single deployment by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM deployment WHERE deployment_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Deployment not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
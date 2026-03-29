const express = require('express');
const db = require('../db');

const router = express.Router();

// POST /api/contracts — add a new contract (auto calculate total_contract_value = staff_required × monthly_rate_per_staff)
router.post('/', async (req, res) => {
  const { client_id, start_date, end_date, staff_required, monthly_rate_per_staff, status } = req.body;
  const total_contract_value = staff_required * monthly_rate_per_staff;
  try {
    const [result] = await db.query(
      'INSERT INTO contract (client_id, start_date, end_date, staff_required, monthly_rate_per_staff, total_contract_value, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [client_id, start_date, end_date, staff_required, monthly_rate_per_staff, total_contract_value, status]
    );
    res.status(201).json({ message: 'Contract added', contract_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/contracts — get all contracts
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contract');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/contracts/:id — get single contract by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM contract WHERE contract_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
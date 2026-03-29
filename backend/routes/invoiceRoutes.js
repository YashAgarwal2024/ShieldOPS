const express = require('express');
const db = require('../db');

const router = express.Router();

// POST /api/invoices — generate an invoice for a contract
router.post('/', async (req, res) => {
  const { contract_id, invoice_month } = req.body;
  try {
    // Fetch contract details
    const [contracts] = await db.query('SELECT staff_required, monthly_rate_per_staff FROM contract WHERE contract_id = ?', [contract_id]);
    if (contracts.length === 0) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    const { staff_required, monthly_rate_per_staff } = contracts[0];
    const total_amount = staff_required * monthly_rate_per_staff;
    // Insert invoice
    const [result] = await db.query(
      'INSERT INTO invoice (contract_id, invoice_month, total_amount, status) VALUES (?, ?, ?, ?)',
      [contract_id, invoice_month, total_amount, 'unpaid']
    );
    res.status(201).json({ message: 'Invoice generated', invoice_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/invoices — get all invoices
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM invoice');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/invoices/:id — get single invoice by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM invoice WHERE invoice_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
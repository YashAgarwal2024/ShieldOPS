const express = require('express');
const db = require('../db');

const router = express.Router();

// POST /api/payments — record a payment for an invoice
router.post('/', async (req, res) => {
  const { invoice_id, amount_paid, payment_date } = req.body;
  try {
    // Insert payment
    const [result] = await db.query(
      'INSERT INTO payment (invoice_id, amount_paid, payment_date) VALUES (?, ?, ?)',
      [invoice_id, amount_paid, payment_date]
    );
    // Check total paid
    const [totalPaidRows] = await db.query('SELECT SUM(amount_paid) AS total_paid FROM payment WHERE invoice_id = ?', [invoice_id]);
    const totalPaid = totalPaidRows[0].total_paid || 0;
    // Get invoice total
    const [invoiceRows] = await db.query('SELECT total_amount FROM invoice WHERE invoice_id = ?', [invoice_id]);
    if (invoiceRows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    const totalAmount = invoiceRows[0].total_amount;
    // Update status
    let status = 'partial';
    if (totalPaid >= totalAmount) {
      status = 'paid';
    }
    await db.query('UPDATE invoice SET status = ? WHERE invoice_id = ?', [status, invoice_id]);
    res.status(201).json({ message: 'Payment recorded', payment_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/payments — get all payments
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM payment');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/payments/:id — get single payment by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM payment WHERE payment_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
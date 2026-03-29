const express = require('express');
const db = require('../db');

const router = express.Router();

// POST /api/clients — add a new client
router.post('/', async (req, res) => {
  const { client_name, client_type, contact, address } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO client (client_name, client_type, contact, address) VALUES (?, ?, ?, ?)',
      [client_name, client_type, contact, address]
    );
    res.status(201).json({ message: 'Client added', client_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/clients — get all clients
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM client');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/clients/:id — get single client by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM client WHERE client_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
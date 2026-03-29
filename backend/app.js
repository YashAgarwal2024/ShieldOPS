const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

const clientRoutes = require('./routes/clientRoutes');
app.use('/api/clients', clientRoutes);

const staffRoutes = require('./routes/staffRoutes');
app.use('/api/staff', staffRoutes);

const contractRoutes = require('./routes/contractRoutes');
app.use('/api/contracts', contractRoutes);

const deploymentRoutes = require('./routes/deploymentRoutes');
app.use('/api/deployments', deploymentRoutes);

const attendanceRoutes = require('./routes/attendanceRoutes');
app.use('/api/attendance', attendanceRoutes);

const invoiceRoutes = require('./routes/invoiceRoutes');
app.use('/api/invoices', invoiceRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await db.query('SELECT 1');
    console.log('DB Connected!');
  } catch (err) {
    console.log('DB Error:', err.message);
  }
});

const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const authMiddleware = require('./middlewares/auth');

const app = express();

app.use(bodyParser.json());

// Middleware untuk autentikasi
app.use(authMiddleware);

// Routes
app.use('/admin', adminRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;

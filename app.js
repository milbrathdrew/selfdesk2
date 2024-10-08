//app.js

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan'); // Import morgan for logging
const app = express();
const Ticket = require('./models/Ticket'); // Assuming you have a Ticket model

app.use(express.static('public')); // Serve static files from the "public" directory

// Import the routers
const rootRouter = require('./routes/root');
const ticketsRouter = require('./routes/tickets');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ticketing', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse JSON bodies (optional if needed)
app.use(express.json());

app.use('/', rootRouter);
app.use('/api/tickets', ticketsRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use(express.static('public'));


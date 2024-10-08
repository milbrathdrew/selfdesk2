// tickets.js

const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Get all tickets
router.get('/', async (req, res, next) => {
  try {
    const tickets = await Ticket.find();

    // Generate HTML to display tickets as cards
    const ticketsHTML = tickets.map(ticket => `
      <div class="ticket">
        <h2>${ticket.title}</h2>
        <p><strong>ID:</strong> ${ticket._id}</p>
        <p><strong>Description:</strong> ${ticket.description}</p>
        <p><strong>Status:</strong> ${ticket.status}</p>
        <button onclick="location.href='/api/tickets/${ticket._id}/edit'">Update</button>
        <button onclick="location.href='/api/tickets/${ticket._id}/delete'">Delete</button>
      </div>
    `).join('');

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>All Tickets</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>All Tickets</h1>
        ${ticketsHTML}
        <button onclick="window.history.back()">Back to Home</button>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error.message); // Log the error message
    next(error); // Pass the error to the error handling middleware
  }
});

// Create a new ticket
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    const ticket = new Ticket({ title, description });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create ticket' });
  }
});

// Get a single ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch ticket' });
  }
});

// Get edit form for a ticket
router.get('/:id/edit', async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Edit Ticket</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Edit Ticket</h1>
        <form method="POST" action="/api/tickets/${ticket._id}/edit">
          <label for="title">Title:</label><br>
          <input type="text" id="title" name="title" value="${ticket.title}"><br>
          <label for="description">Description:</label><br>
          <textarea id="description" name="description">${ticket.description}</textarea><br>
          <label for="status">Status:</label><br>
          <input type="text" id="status" name="status" value="${ticket.status}"><br>
          <button type="submit">Update</button>
        </form>
        <button onclick="window.history.back()">Back</button>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error.message); // Log the error message
    next(error); // Pass the error to the error handling middleware
  }
});


// Get confirmation page for delete operation
router.get('/:id/delete', async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Delete Ticket</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Delete Ticket</h1>
        <p>Are you sure you want to delete this ticket?</p>
        <form method="POST" action="/api/tickets/${ticket._id}/delete">
          <button type="submit">Yes, delete it</button>
        </form>
        <button onclick="window.history.back()">No, keep</button>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error.message); // Log the error message
    next(error); // Pass the error to the error handling middleware
  }
});


module.exports = router;

const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ticketing API</title>
      <link rel="stylesheet" href="/styles.css">
      <link rel="stylesheet" href="/font-awesome/css/all.min.css">
      <style>
        .centered-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          height: 100vh;
          text-align: center;
          padding-top: 50px;
        }
        .content-box {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 20px;
          width: 80%;
          max-width: 500px;
        }
        button {
          background-color: #645466;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          text-decoration: none;
          margin-top: 10px;
          cursor: pointer;
        }
        button:hover {
          background-color: #3f3183;
        }
        .fa-spin {
          animation: spin 2s linear infinite;
          margin-top: 20px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </head>
    <body>
      <div class="centered-content">
        <div class="content-box">
          <h1>Welcome to Selfdesk</h1>
          <p>Use <strong>/api/tickets</strong> for ticket operations.</p>
          <button onclick="location.href='/api/tickets'">Go to My Queue</button>
        </div>
        <i class="fas fa-cog fa-spin"></i>
      </div>
    </body>
    </html>
  `);
});

module.exports = router;

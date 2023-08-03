const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

// POST route for sending email
app.post('/sendEmail', (req, res) => {
  // Extract the form data from the request body
  const { name, subject, message,senderEmail } = req.body;

  // Configure transporter with your email provider settings
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'coderoofitsolutions@gmail.com',
      pass: 'moczjgdjurjhgfqr'
    }
  });

  const mailOptions = {
    from: senderEmail,
    to: 'coderoofitsolutions@gmail.com', // Replace this with your desired recipient email address
    subject,
    text: `Name: ${name}\nSender's email: ${senderEmail}\n\n${message}` // Include sender's name and email in the body 
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
});

// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

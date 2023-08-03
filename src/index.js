const express = require("express");
const nodemailer = require('nodemailer')
const app = express();
// let PORT = 6000;

const sendMail = require("./controllers/sendMail");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("I am a server");
});

// POST route for sending email
app.post("/sendEmail", (req, res) => {
  try {
    console.log(req.body)
    // Extract the form data from the request body
    const { toEmail, subject, message ,senderEmail,name } = req.body;

    // Configure transporter with your email provider settings
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "coderoofitsolutions@gmail.com",
        pass: "moczjgdjurjhgfqr",
      },
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
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        res.json({ message: "Email sent successfully" });
      }
    });
  } catch (err) {
    console.log(err)
  }
});

// app.post("/mail", sendMail);

// app.get("/mail", sendMail);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {}
};

start();

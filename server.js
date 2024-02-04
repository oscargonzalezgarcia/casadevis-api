import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASS,
  },
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'email@example.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

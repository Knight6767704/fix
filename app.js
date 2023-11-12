
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = {
    origin: 'https://knight6767704.github.io/fix/', // Replace with the actual origin of your site
    methods: 'POST',
};




const express = require('express');
const path = require('path'); // Node.js module for working with file paths

const app = express();

app.use(cors());
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(__dirname));

// Define a route to handle the root URL and serve your HTML file
app.get('/', (req, res) => {
    // Use path.join to create an absolute path to your HTML file
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit-form', (req, res) => {
    const { fullName, phone, subject, message } = req.body;

    // Create a transporter using nodemailer to send emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'knightsind6767704@gmail.com', // Your Gmail email address
            pass: 'qzjl hzbo jpkp jmec ' // Your Gmail email password
        }
    });

    // Email message options (senders mail options are omitted)
    const mailOptions = {
        to: 'knightsind6767704@gmail.com', // Your Gmail email address
        subject: `New Contact Form Submission: ${subject}`,
        text: `Full Name: ${fullName}\nPhone No.: ${phone}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send("Sent Sucessfully!")
        }
    });
});

const PORT = 443;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

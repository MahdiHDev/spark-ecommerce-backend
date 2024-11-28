const nodemailer = require('nodemailer');
const { smtpUsername, smtpPassword } = require('../secret');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: smtpUsername,
        pass: smtpPassword,
    },
    logger: true, // Enable detailed logs
    debug: true, // Enable debug output
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error verifying transporter:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

const emailWithNodeMailer = async (emailData) => {
    try {
        const mailOptions = {
            from: smtpUsername, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            html: emailData.html, // html body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.response);
    } catch (error) {
        console.error('Error occured while sending email: ', error);
        throw error;
    }
};

module.exports = emailWithNodeMailer;

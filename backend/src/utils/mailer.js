import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  try {
    let transporter;

    // Use environment variables if provided (e.g. for Gmail, SendGrid, etc.)
    if (process.env.SMTP_HOST) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Fallback for local development: Create a free Ethereal test account automatically
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Apple IN EMS" <noreply@appleinems.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html || `<p>${options.text}</p>`, // basic HTML fallback
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('--- EMAIL SENT ---');
    console.log(`To: ${options.to}`);
    if (!process.env.SMTP_HOST) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      console.log('Note: To send real emails, please configure SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in your backend .env file.');
    }
    console.log('------------------');
    return true;
  } catch (error) {
    console.error('Email could not be sent:', error);
    return false;
  }
};

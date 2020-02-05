const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: '',
  from: 'l_x-kira@hotmail.com',
  subject: '',
  text: '',
  html: '',
};
sgMail.send(msg);
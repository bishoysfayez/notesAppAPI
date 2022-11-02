
import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bishoysfayez@gmail.com',
      pass: 'todo'
    }
  });





export default transporter;

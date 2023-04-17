var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: 'gmail',
    service: 'Gmail',
    auth: {
        user: 'sunti.po61@rsu.ac.th',
        pass: 'Rsu6101187',
    }
});
// const session = require('express-session');
// import router ;
let loginSystem = require('./routes/loginRoute')
let bookRoute = require('./routes/bookRoute')
let adminRoute = require('./routes/adminRoute');
const auth = require('./middleware/auth');
//import middleware
// let auth = require('./middleware/auth')

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.set('trust proxy', 1) // trust first proxy

// app.use(session({
//   secret: 'mysecretkey',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false, maxAge: 60 * 60 * 1000 }
// }));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/login', loginSystem)
app.use('/api/book', bookRoute)
app.use('/api/admin', adminRoute)

app.post('/send-email/test', (req, res) => {
    transporter.sendMail({
        from: 'sunti.po61@rsu.ac.th>',   // ผู้ส่ง
        to: "saknsaza87@gmail.com",// ผู้รับ
        //  to: "sunti.porkhamchan@gmail.com",// ผู้
        subject: "Book Donation",                      // หัวข้อ
        text: "สวัสดีนะ",                         // ข้อความ
        html: `
        ทางเว็บไซต์ “Book Donation“ ได้บริจาคหนังสือและวารสารตามที่ท่านร้องขอแล้ว หวังว่าหนังสือและวารสารที่ท่านได้รับจะมีประโยชน์สูงสุด 
        <br>
        <br>
        <br>
        ขอแสดงความนับถือ 
        `,                // ข้อความ
    }, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
    res.status(200).json({ msg: 'success' })
})
// app.post('/send-email', auth, (req, res) => {
//     const { to_email , base64_img } = req.body
//     transporter.sendMail({
//         from: 'sunti.po61@rsu.ac.th>',   // ผู้ส่ง
//         to: to_email,// ผู้รับ
//         // to: "sunti.porkhamchan@gmail.com",// ผู้
//         subject: "จากมหาวิทยาลัยรังสิตเรื่องการรับบริจาคหนังสือ",                      // หัวข้อ
//         text: "ขอขอบคุณ ",                         // ข้อความ
//         html: `<b>ขอขอบคุณที่มารับหนังสือเล่มนี้</b>
//         <br>
//         <img src="${base64_img}">`,                // ข้อความ
//     }, (err, info) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(info.messageId);
//         }
//     });
//     res.status(200).json({ msg: 'success' })
// })
app.post('/send-email', auth, (req, res) => {
    const { to_email, base64_img } = req.body;
  
    // แยกข้อมูลภาพและนำมาใส่ใน attachments
    const imageType = base64_img.split(';')[0].split('/')[1];
    const imageData = base64_img.split(',')[1];
    const attachments = [{
      filename: 'image.' + imageType,
      content: Buffer.from(imageData, 'base64'),
      contentType: 'image/' + imageType,
      contentEncoding: 'base64',
      cid: 'image'
    }];
  
    transporter.sendMail({
      from: 'sunti.po61@rsu.ac.th',
      to: to_email,
      subject: 'Book Donation',
      text: 'ขอขอบคุณ',
      html: `
      ทางเว็บไซต์ “Book Donation“ ได้บริจาคหนังสือและวารสารตามที่ท่านร้องขอแล้ว หวังว่าหนังสือและวารสารที่ท่านได้รับจะมีประโยชน์สูงสุด 
      <br>
      <br>
      <br>
      ขอแสดงความนับถือ 
        <img src="cid:image">`,
      attachments: attachments
    }, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(info.messageId);
      }
    });
  
    res.status(200).json({ msg: 'success' });
  });
  

module.exports = app;

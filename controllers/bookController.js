let importTimeModel = require('../models/importTimeModel')
let bookModel = require("../models/bookModel")
let usersModel = require("../models/usersModels")
var jwt = require('jsonwebtoken');
const secret_key = 'book'

function jwt_decoded(token) {
    return jwt.verify(token, secret_key);
}
function jwt_generate_token(data) {
    return jwt.sign(data, secret_key);
}
const nodemailer = require("nodemailer");
const { count_book } = require('../models/bookModel');
let transporter = nodemailer.createTransport({
    host: 'gmail',
    service: 'Gmail',
    auth: {
        user: 'sunti.po61@rsu.ac.th',
        pass: 'Rsu6101187',
    }
});

module.exports = {
    verifyBook: async (req, res) => {
        try {
            //ตรวจสอบว่ามีข้อมูลเข้ามาจริง
            const { email, date, j_num, b_num, phone, token } = req.body
            let approve_id = jwt_decoded(token).id
            let tomill = new Date(date).getTime()
            if (email && date && j_num && b_num && phone) {
                const [row, fields] = await importTimeModel.insert_import_time(approve_id, email, tomill, j_num, b_num, phone)
                res.status(200).json({ message: 'success' });
            } else {
                res.status(400).json({ message: 'Internal server error' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    findAll: async (req, res) => {
        try {
            const [row, fields] = await importTimeModel.findAllandJoinImportTime()
            res.status(200).json({ message: 'success', data: row });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateStatusByItId: async (req, res) => {
        try {
            const { id } = req.body
            console.log('id ', id)
            const [row, fields] = await importTimeModel.updateStatus(id)
            res.status(200).json({ message: 'success', data: row });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    findAllBook: async (req, res) => {
        try {
            const [row2, fields2] = await bookModel.findAllWithInfoEmployee2()
            const [row, fields] = await bookModel.findAllWithInfoEmployee()
            res.status(200).json({ message: 'success', data: row, user_get: row2 });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    approved: async (req, res) => {
        try {
            const { book_name, date_time_in, img, type, token, email } = req.body
            let approve_id = jwt_decoded(token).id
            let [uid_rows, uid_fields] = await usersModel.findIdByEmail(email)
            // console.log(uid_rows)
            transporter.sendMail({
                from: 'sunti.po61@rsu.ac.th>',   // ผู้ส่ง
                to: email,// ผู้รับ
                //  to: "sunti.porkhamchan@gmail.com",// ผู้
                subject: "Book Donation",                      // หัวข้อ
                text: "Book Donation",                         // ข้อความ
                html: `
                ตามที่ท่านได้กรุณามอบหนังสือและวารสารให้แก่ เว็บไซต์ “ Book donation “
เพื่อเผยแพร่และให้ประโยชน์ในการนำไปบริจาคต่อ
       ทางเว็บไซต์ ” Book donation “ ได้รับหนังสือและวารสารดังกล่าวแล้ว ด้วยความขอบคุณยิ่งและจะบริจาคไปยัง สถานที่ขาดแคลนต่อไป 
 
                <br>
                <br>
                <br>
                ขอแสดงความนับถือ 
                `,                // ข้อความ
            }, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(info.messageId);
                }
            });
            let uid = uid_rows[0].id
            if (approve_id && book_name && date_time_in && img && type) {
                const [row, fields] = await bookModel.insertBook(approve_id, uid, book_name, date_time_in, img, type)
                console.log(row)
                res.status(200).json({ message: 'success', data: row });
            } else {
                res.status(400).json({ message: 'client wrong' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateStatus: async (req, res) => {
        try {
            const { date_time_out, id } = req.body
            if (date_time_out && id) {
                const [find_id_row, find_id_fields] = await bookModel.findAllById(id)
                // console.log(find_id_row[0])
                if (find_id_row[0].date_time_in > date_time_out) {
                    res.status(400).json({ message: 'จำนวนเวลาที่ส่งมาไม่ถูกต้อง' });
                } else {
                    const [update_row, update_fields] = await bookModel.updateById(id, date_time_out)
                    res.status(200).json({ message: 'success', data: update_row });
                }
            } else {
                res.status(400).json({ message: 'client wrong' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });

        }
    },
    requestbook: async (req, res) => {
        try {
            const { token, arr } = req.body
            let id = jwt_decoded(token).id
            arr.forEach(async e => {
                const [update_row, update_fields] = await bookModel.updateUget(id, e)
            });
            res.status(200).json({ message: 'success' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    count_book : async (req,res) =>{
        try {
            const [rows,fields] = await bookModel.count_book()
            const [rows2,fields2] = await bookModel.count_book2()

            let book = rows[0].count
            let journal = rows[1].count
            let export1 = rows2[0].c
            let import1 = rows2[1].c
            // SELECT SUM(journal_num) ,SUM(book_num) FROM import_time;
            res.status(200).json({ message: 'success' ,book,journal,export1,import1});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        } 
    }
}
let importTimeModel = require('../models/importTimeModel')
let bookModel = require("../models/bookModel")
var jwt = require('jsonwebtoken');
const secret_key = 'book'

function jwt_decoded(token) {
    return jwt.verify(token, secret_key);
}
function jwt_generate_token(data) {
    return jwt.sign(data, secret_key);
}

module.exports = {
    verifyBook: async (req, res) => {
        try {
            //ตรวจสอบว่ามีข้อมูลเข้ามาจริง
            const { email, date, j_num, b_num, phone, token } = req.body
            let uid = jwt_decoded(token).id
            let tomill = new Date(date).getTime()
            if (email && date && j_num && b_num && phone) {
                const [row, fields] = await importTimeModel.insert_import_time(uid, email, tomill, j_num, b_num, phone)
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
            const [row, fields] = await bookModel.findAll()
            res.status(200).json({ message: 'success', data: row });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    approved: async (req, res) => {
        try {
            const { book_name, date_time_in, img, type, token } = req.body
            let uid = jwt_decoded(token).id
            if (uid && book_name && date_time_in && img && type) {
                const [row, fields] = await bookModel.insertBook(uid, book_name, date_time_in, img, type)
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
                if (find_id_row[0].date_time_in > date_time_out) {
                    res.status(400).json({ message: 'จำนวนเวลาที่ส่งมาไม่ถูกต้อง' });
                } else {
                      const [update_row, update_fields] = await bookModel.updateById(id,date_time_out)
                      res.status(200).json({ message: 'success', data: update_row });
                }
            } else {
                res.status(400).json({ message: 'client wrong' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });

        }
    }
}
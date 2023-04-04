let importTimeModel = require('../models/importTimeModel')
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
            const {id} = req.body
            console.log('id ',id)
            const [row, fields] = await importTimeModel.updateStatus(id)
            res.status(200).json({ message: 'success', data: row });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

const userModel = require('../models/usersModels')

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const [rows, fields] = await userModel.findAll()
      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
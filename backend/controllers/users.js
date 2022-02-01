const connection = require("../db/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const createNewAuthor = async (req, res) => {
  const { userName, email, password, role_id } = req.body;

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `INSERT INTO users ( useName,email, password, role_id) VALUES (?,?,?,?)`;
  const data = [userName, email, encryptedPassword, role_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "The email already exists",
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: "Success Author Added",
      results: results,
    });
  });
};

module.exports = {
  createNewAuthor,
};

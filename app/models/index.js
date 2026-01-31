const dbConfig = require("../config/db.config.js")
const mysql = require("mysql2")

// Создание подключения к датабазе
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

connection.connect((err) => {
    if (err) throw err
    console.log("Успешное подключение к датабазе.")
})

module.exports = connection

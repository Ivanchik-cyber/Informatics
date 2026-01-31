const database = require("./index.js")

// Класс пользователя
class User {
    constructor(user) {
        this.userLogin = user.userLogin
        this.userPassword = user.userPassword
        this.progress1 = user.progress1
        this.progress2 = user.progress2
        this.progress3 = user.progress3
        this.progress4 = user.progress4
    }
    // Получает все логины
    static getAllLogins(result) {
        const query = "SELECT userLogin FROM userInfo;"
        database.query(
            query, (err, res) => {
                result(err, res)
            }
        )
    }
    // Создаёт пользователя
    static create(newUser, result) {
        const query = "INSERT INTO userInfo SET ?;"
        database.query(
            query, newUser, (err, res) => {
                result(err, newUser)
            }
        )
    }
    // Получает всю информацию пользователя
    static getUserInfo(userLogin, result) {
        const query = `SELECT * FROM userInfo WHERE userLogin = "${userLogin}";`
        database.query(
            query, (err, res) => {
                if (err) {
                    result(err, null)
                } else {
                    result(null, res[0])
                }
            }
        )
    }
    // Получает прогресс пользователя
    static getUserProgress(userLogin, result) {
        const query = `SELECT progress1, progress2, progress3, progress4 FROM userInfo WHERE userLogin = "${userLogin}";`
        database.query(
            query, (err, res) => {
                if (err) {
                    result(err, null)
                } else {
                    result(null, res[0])
                }
            }
        )
    }
    // Оюновление прогресса пользователя
    static updateUserProgress(userLogin, progressNumber, updateFun, result) {
        this.getUserProgress(userLogin, (err, data) => {
            const oldProgress = data[progressNumber]
            const newProgress = updateFun(oldProgress)
            const query = `UPDATE userInfo SET ${progressNumber} = ${newProgress} WHERE userLogin = "${userLogin}";`
            database.query(
                query, (err, res) => {
                    result(err, res)
                }
            )
        })
    }
}

module.exports = User

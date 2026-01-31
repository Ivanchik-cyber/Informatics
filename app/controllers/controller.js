const User = require("../models/model.js")

// Находит все логины
exports.findAllLogins = (req, res) => {
    User.getAllLogins((err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "Some error occurred."})
        } else {
            res.send(data)
        }
    })
}

// Создаёт пользователя
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Can't be empty."})
    }

    const user = new User({
        userLogin: req.body.userLogin,
        userPassword: req.body.userPassword,
        progress1: 0,
        progress2: 0,
        progress3: 0,
        progress4: 0
    })

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "Some error occurred."})
        } else {
            res.send(data)
        }
    })
}

// Проверяет пароль
exports.checkPassword = (req, res) => {
    const userLogin = req.params.login
    const guessPassword = req.params.password
    if (!userLogin || !guessPassword) {
        res.status(400).send({message: "Can't be empty."})
    }
    User.getUserInfo(userLogin, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "Some error occurred."})
        } else {
            const correctPassword = data.userPassword
            const isCorrect = guessPassword === correctPassword
            res.send(isCorrect)
        }
    })
}

// Получает прогресс
exports.getProgress = (req, res) => {
    const userLogin = req.params.login
    if (!userLogin) {
        res.status(400).send({message: "Can't be empty."})
    }
    User.getUserProgress(userLogin, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "Some error occurred."})
        } else {
            res.send(data)
        }
    })
}

// Обновляет прогресс на 1
exports.updateProgress = (req, res) => {
    const userLogin = req.params.login
    const progressNumber = req.params.progressNumber
    if (!userLogin || !progressNumber) {
        res.status(400).send({message: "Can't be empty."})
    }
    User.updateUserProgress(userLogin, progressNumber, n => n + 1, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "Some error occurred."})
        } else {
            res.send(data)
        }
    })
}

// Сбрасывает прогресс
exports.deleteProgress = (req, res) => {
    const userLogin = req.params.login
    const progressNumber = req.params.progressNumber
    if (!userLogin || !progressNumber) {
        res.status(400).send({message: "Can't be empty."})
    }
    User.updateUserProgress(userLogin, progressNumber, n => 0, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "Some error occurred."})
        } else {
            res.send(data)
        }
    })
}

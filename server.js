const express = require("express")
const cors = require("cors")
const router = require("./app/routes/routes.js")

// Создание приложения
const app = express()

// Настройка приложения
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Создание роутера
router(app)

// Вывод результата
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Сервер запущен на порте ${port}.`)
})

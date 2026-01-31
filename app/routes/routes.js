// Настройка маршрутизации
module.exports = app => {
    const users = require("../controllers/controller.js")
    const router = require("express").Router()

    router.get("/", users.findAllLogins)
    router.get("/:login/progress", users.getProgress)
    router.get("/:login/password/:password", users.checkPassword)

    router.post("/", users.create)

    router.put("/:login/progress/:progressNumber", users.updateProgress)
    router.put("/:login/progress/:progressNumber/delete", users.deleteProgress)

    app.use("/api/users", router)
}

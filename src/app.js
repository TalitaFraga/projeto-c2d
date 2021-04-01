require('dotenv-safe').config()
const express = require("express")
const app = express()

app.use(express.json())

const index = require("./routes/index")
const usuarios = require("./routes/usuarioRoute")
const cadastro = require("./routes/authRouter")

app.use(function (req, res, next) {
    res.header("Acess-Control-Allow-Origin", "*")
    res.header(
        "Acess-Control-Allow-Headers",
        "Origin, X-Request-with, Content-Type, Accept"
    )
    next()
})

app.use("/", index)
app.use("/usuarios", usuarios)
app.use("/", cadastro)


module.exports = app
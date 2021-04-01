const usuarios = require("../models/usuarios.json")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require("fs")
const SECRET = process.env.SECRET


const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const validatePassword = (password) => {
    const re = /[a-z]\d|\d[a-z]/i
    return re.test(password) && password.length >= 6
}

const signUp = (req, res) => {
    if(!validateEmail(req.body.email)){
        return res.status(400).send("This email is not valid")
    }

    if(!validatePassword(req.body.password)){
        return res.status(400).send("This password is not valid")
    }
    const passwordHash = bcrypt.hashSync(req.body.password, 10)
    req.body.password = passwordHash
    usuarios.push(req.body)

    fs.writeFile("./src/models/usuarios.json", JSON.stringify(usuarios), 'utf-8', function(err) {
        if (err) {
            return res.status(424).send({ message: err })
        }
    })
    res.status(201).send(req.body)
}

const login = (req, res) => {
    const usuario = usuarios.find(usuario => usuario.email === req.body.email)

    if(!usuario){
        return res.status(404).send("No user with this email")
    }

    const validPassword = bcrypt.compareSync(req.body.password, usuario.password)

    if(!validPassword) {
        return res.status(403).send("invalid password")
    }

    const token = jwt.sign({ email: req.body.email}, SECRET)

    return res.status(200).send(token)
}




module.exports = { signUp, login }
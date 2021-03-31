const usuarios = require("../models/usuarios.json")
const fs = require("fs")

const getAll = (req, res) => {
    console.log(req.url)
    res.status(200).send(usuarios)
}

const getById = (req, res) => {
    const id = req.params.id

    const usuario = usuarios.find((usuario) => usuario.id == id)

    if(usuario) {
        res.status(200).send(usuario)
    }else {
        res.status(404).send("Usuário não encontrado")
    }
}

const postUsuario = (req, res) => {

    const { id, nome, cpf, telefone, email } = req.body
    usuarios.push({ id, nome, cpf, telefone, email })
    
    fs.writeFile("./src/models/usuarios.json", JSON.stringify(usuarios), 'utf-8', function(err) {
        if (err) {
            return res.status(424).send({ message: err })
        }
    })
    res.status(201).send(usuarios)
}

const putUsuario = (req, res) => {
    const id = req.params.id
    const newUsusario = req.body

    const usuarioAtualizado = usuarios.map((usuario)=> {
        if(usuario.id == id) return newUsusario
        return usuario
    })
    fs.writeFile("./src/models/usuarios.json", JSON.stringify(usuarioAtualizado), 'utf-8', function(err) {
        if(err){
            return res.status(424).send({ message: err })
        }
    })
    res.status(200).send(usuarioAtualizado)
}

const deleteUsuario = (req, res) => {
    const id = req.params.id
    const usuarioFiltrado = usuarios.find((usuario) => usuario.id == id)
    const index = usuarios.indexOf(usuarioFiltrado)
    usuarios.splice(index, 1)

    fs.writeFile("./src/models/usuarios.json", JSON.stringify(usuarios), 'utf-8', function(err){
        if(err) {
            return res.status(424).send({ message: err })
        }
    })
    res.status(200).send({index: index})
}



module.exports = {getAll, getById, postUsuario, putUsuario, deleteUsuario}
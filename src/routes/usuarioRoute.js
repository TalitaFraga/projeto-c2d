const express = require("express")
const router = express.Router()
const controller = require("../controllers/usuarioController")

router.get("/", controller.getAll)
router.get("/:id", controller.getById)
router.post("/", controller.postUsuario)
router.put("/:id", controller.putUsuario)
router.delete("/:id", controller.deleteUsuario)

module.exports = router
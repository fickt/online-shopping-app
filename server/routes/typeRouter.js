const Router = require('express')
const router = new Router()
const typeController = require('../controller/typeController')
const checkRole = require('../middleware/checkRoleMiddleWare')

router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)

module.exports = router
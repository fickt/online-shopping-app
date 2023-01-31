const Router = require('express')
const router = new Router()
const deviceController = require('../controller/deviceController')

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.get)


module.exports = router
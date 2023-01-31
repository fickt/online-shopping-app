const { Brand } = require('../models/models')

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const type = await Brand.create({name})
        return res.json({type})
    }

    async getAll(req, res) {

    }
}
module.exports = new BrandController()
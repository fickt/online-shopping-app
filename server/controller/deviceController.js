const { Type } = require('../models/models')

class DeviceController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json({type})
    }

    async getAll(req, res) {

    }

    async get(req, res) {

    }

}
module.exports = new DeviceController()
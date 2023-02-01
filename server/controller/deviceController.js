const { Device } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const apiError = require('../error/apiError')

class DeviceController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const type = await Device.create({ name, price, brandId, typeId, img: fileName })
            return res.json({ type })
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const { brandId, typeId, page, limit } = req.query
        let devices

        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit

        if (brandId && typeId) {
            devices = await Device.findAll({
                where: { brandId, typeId },
                limit,
                offset
            })
        }
        if (brandId && !typeId) {
            devices = await Device.findAll({
                where: { brandId },
                limit,
                offset
            })
        }
        if (!brandId && typeId) {
            devices = await Device.findAll({
                where: { typeId },
                limit,
                offset
            })
        }
        if (!brandId && !typeId) {
            devices = await Device.findAll({
                limit,
                offset
            })
        }
        return res.json(devices)
    }

    async get(req, res) {

    }

}
module.exports = new DeviceController()
const apiError = require('../error/apiError')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body

        if (!email || !password) {
            return next(apiError.badRequest('invalid email or password'))
        }
        const candidate = await User.findOne({
            where: { email }
        })

        if (candidate) {
            return next(apiError.badRequest('user with such email already exists!'))
        }
        const hashPassword = await bCrypt.hash(password, 5)
        const user = await User.create({
            email,
            role,
            password: hashPassword
        })

        const basket = await Basket.create({
            userId: user.id
        })

        const jwtToken = generateJwt({
            id: user.id,
            email,
            role
        })

        return res.json({ jwtToken })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne(
            { where: { email } }
        )
        if (!user) {
            return next(apiError.badRequest('Incorrect email or password'))
        }

        let comparePassword = bCrypt.compareSync(password, user.password)

        if (!comparePassword) {
            return next(apiError.badRequest('Incorrect password'))
        }

        const jwtToken = generateJwt({
            userId: user.id,
            email,
            role: user.role
        })
        return res.json({ jwtToken })
    }

    async check(req, res, next) {
        const token = generateJwt(
            req.user.id,
            req.user.email,
            req.user.role)

        return res.json({ token })
    }


}

const generateJwt = (id, email, role) => {
    const jwtToken = jwt.sign({
        id,
        email,
        role
    },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
    return jwtToken
}

module.exports = new UserController()


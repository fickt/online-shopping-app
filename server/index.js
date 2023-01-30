require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const PORT = process.env.PORT || 5000

const app = express()

const start = async () => {
    try {
        console.log(process.env.DB_NAME)
            console.log(process.env.DB_PASSWORD)
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
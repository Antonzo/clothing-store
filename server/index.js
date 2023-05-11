require('dotenv').config()
const express = require('express')
const sequelize = require('./db')

const PORT = process.env.port || 7777
const app = express()

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
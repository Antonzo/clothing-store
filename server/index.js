require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')

const PORT = process.env.port || 7777
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'Working!!'})
})

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
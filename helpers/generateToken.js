require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const generateToken = (user) => {
    const { id, name, email, type } = user

    return jwt.sign({ id, name, email, type }, secretKey)
}

module.exports = generateToken 
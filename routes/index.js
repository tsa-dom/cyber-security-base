const express = require('express')
const { userExtractor } = require('../utils/middleware')
const router = express.Router()

router.get('/', userExtractor,(req, res) => {
  res.render('index', { _csrf: req.csrfToken(), user: req.user })
})

router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.redirect('/')
})

module.exports = router
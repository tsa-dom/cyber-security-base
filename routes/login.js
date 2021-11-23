const express = require('express')
const router = express.Router()
const db = require('../db')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
  res.render('login', { _csrf: req.csrfToken() })
})

router.post('/', (req, res) => {
  const sql = 'SELECT * FROM Users WHERE user=(?) AND password=(?)'
  const { username, password } = req.body
  const params = [username, password]
  db.get(sql, params, (err, row) => {
    if (!err && row) {
      const token = jwt.sign(row, 'token-shoul-not-contain-a-password-and-this-text-does-not-belong-here')

      res.cookie('token', token)
      res.redirect('/')
      return
    } else {
      res.redirect('/login')
      return
    }
  })
})

module.exports = router
const express = require('express')
const { userExtractor } = require('../utils/middleware')
const router = express.Router()
const db = require('../db')

router.get('/', userExtractor,(req, res) => {
  res.render('index', { _csrf: req.csrfToken(), user: req.user })
})

router.get('/signup', (req, res) => {
  res.render('signup', { _csrf: req.csrfToken() })
})

router.post('/signup', (req, res) => {
  const sql = 'INSERT INTO Users (user, password) VALUES (?, ?)'
  const { username, password } = req.body
  const params = [username, password]
  db.run(sql, params, (err) => {
    if (!err) {
      res.redirect(307, '/login')
      return
    }
    res.redirect('/signup')
  })
})

router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.redirect('/')
})

module.exports = router
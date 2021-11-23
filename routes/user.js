const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/:user', (req, res) => {
  const user = req.params.user
  res.render('user', { _csrf: req.csrfToken(), user: user })
})

router.post('/', (req, res) => {
  const { user, password } = req.body
  const sql = 'UPDATE Users SET password=(?) WHERE user=(?)'

  db.run(sql, [password, user], (err) => console.log(err))

  res.redirect('/')
})

module.exports = router
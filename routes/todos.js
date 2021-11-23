const express = require('express')
const router = express.Router()
const db = require('../db')
const { userExtractor } = require('../utils/middleware')

router.get('/', userExtractor, (req, res) => {
  const user = req.user
  const sql = 'SELECT todo FROM Todos WHERE owner=\'' + user + '\''

  db.all(sql, (err , rows) => {
    res.render('todos', { _csrf: req.csrfToken(), todos: rows.map(e => e.todo) })
  })
})

router.post('/', userExtractor, (req, res) => {
  const user = req.user
  const todo = req.body.todo
  const sql = 'INSERT INTO Todos (owner, todo) VALUES (?, ?)'

  const todos = db.prepare(sql)
  todos.run(user, todo)
  todos.finalize()

  res.redirect('/todos')
})

module.exports = router
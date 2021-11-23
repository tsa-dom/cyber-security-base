const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

db.serialize(() => {
  db.run('CREATE TABLE Users (user TEXT NOT NULL UNIQUE, password TEXT)')
  db.run('CREATE TABLE Todos (owner TEXT, todo TEXT)')

  const users = db.prepare('INSERT INTO Users (user, password) VALUES (?, ?)')
  users.run('admin', 'admin')
  users.run('alice', 'malicious')
  users.run('bob', 'secret')
  users.run('\' UNION SELECT password AS todo FROM Users WHERE user=\'bob', 'hacker')
  users.finalize()
})

module.exports = db
const app = require('./app')
const http = require('http')

const server = http.createServer(app)

const PORT = 8000

server.listen(PORT)
server.on('listening', () => {
  console.log('Server is listening on port', PORT)
})
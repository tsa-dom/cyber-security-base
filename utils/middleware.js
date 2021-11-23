const jwt = require('jsonwebtoken')

const userExtractor = async (req, res, next) => {
  const token = req.cookies.token
  try {
    const decodedToken = jwt.verify(token,
      'token-shoul-not-contain-a-password-and-this-text-does-not-belong-here'
    )
    if (!decodedToken || !token) {
      req.user = null
    }
    req.user = decodedToken.user
  } catch (_) {() => {
    req.user = null
  }}

  next()
}

module.exports = { userExtractor }
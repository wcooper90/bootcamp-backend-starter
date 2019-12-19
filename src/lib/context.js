const { isSameHour } = require('date-fns')
const { createToken, decodeToken } = require('../lib/auth')
const User = require('../models/User')

// The method exported here sets the context for all resolvers and refreshes tokens
module.exports = async ({ req, res }) => {
  // If login or register, skip auth requirements
  if (req.body.operationName === 'login' || req.body.operationName === 'register') {
    return ({
      req, res,
    })
  }

  // Collect JWT, escape 'Bearer' prefix
  const jwt = req.headers.authorization ? req.headers.authorization.slice(7) : null

  if (!jwt) {
    // No JWT present for auth
    return ({
      req,
      res,
    })
  }

  try {
    const {
      sub, iat,
    } = decodeToken(jwt)

    const user = await User.query().findById(sub)
    if (isSameHour(iat, new Date().getTime() / 1000)) {
      return ({
        req,
        res,
        user,
      })
    }

    // If token is more than an hour old, refresh it
    const payload = {
      sub: user.id,
    }
    res.set('x-token', createToken(payload))

    return ({
      req,
      res,
      user,
    })
    // If failed context creation, make unathenticated request
  } catch (error) {
    return ({
      req, res,
    })
  }
}

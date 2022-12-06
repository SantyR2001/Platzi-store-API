const jwt = require('jsonwebtoken');

const { config } = require('./config/config');
const secret = config.jwtSecret;
const jwtConfig = {
  expiresIn: '7d',
};
const payload = {
  sub: 1,
  role: 'customer',
};

function signToken(payload, secret, jwtConfig) {
  return jwt.sign(payload, secret, jwtConfig);
}

const token = signToken(payload, secret, jwtConfig);

console.log(token);

module.exports = { token };

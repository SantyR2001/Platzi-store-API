const jwt = require('jsonwebtoken');

const { config } = require('./config/config');
const secret = config.jwtSecret;
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3MDM1MDc0MCwiZXhwIjoxNjcwOTU1NTQwfQ.A8TzV7cGnPnhcfKOH1lZigXwoJgOslibV2kDyFA6S5I';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

module.exports = { token };

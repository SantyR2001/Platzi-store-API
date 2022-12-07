const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const secret = config.jwtSecret;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const jwtConfig = {
        expiresIn: '7d',
      };

      const token = jwt.sign(payload, secret, jwtConfig);

      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

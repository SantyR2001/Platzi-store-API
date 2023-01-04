const boom = require('@hapi/boom');
const UserService = require('./user.service');
const service = new UserService();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');

const { smtpEmail, smtpPass } = config;

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  async signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const jwtConfig = {
      expiresIn: '7d',
    };

    const token = jwt.sign(payload, config.jwtSecret, jwtConfig);

    res.json({
      user,
      token,
    });
  }

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: smtpEmail,
        pass: smtpPass,
      },
    });
    await transporter.sendMail({
      from: smtpEmail,
      to: user.email,
      subject: `Change password ✔`,
      text: `Change password`,
      html: '<b>Hello user, do you want change you password?</b>',
    });
    return { message: 'mail sent' };
  }
}

module.exports = AuthService;

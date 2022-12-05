const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const passwordHashed = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: passwordHashed,
    });

    delete newUser.dataValues.password;

    return newUser;
  }

  async find() {
    const response = await models.User.findAll({
      include: ['customer'],
    });
    return response;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;

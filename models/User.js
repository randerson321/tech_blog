const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/config');
const bcrypt = require('bcrypt');

class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(login){
    return bcrypt.compareSync(login, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      //validation
    },
  },
  {
    hooks: {
      async beforeCreate(newUser){
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User'
  }
);

module.exports = User;
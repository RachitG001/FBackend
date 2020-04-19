const bcrypt = require('bcrypt');

module.exports = (sequelize, type) => {

    const User = sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
            notNull: true
        },
        username: {
            type: type.STRING,
            unique: true,
            allowNull: false,
            validate: {
                is: /^[a-z0-9\_\-]+$/i,
              }
        },
        email: {
            type: type.STRING,
            isEmail: true,
            unique: true,
            allowNull: false
        },
        password: {
            type: type.STRING,
            allowNull: false,
        },
        isActive: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue : true
        },
        gender: {
            type: type.STRING,
            allowNull: false
        },
        dob:{
            type: type.STRING(11),
        },
        countryExt: {
            type: type.STRING,
            notNull: true
        },
        mobile:{
            type: type.STRING(10)
        },
        type: {
            type: type.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        bio: {
            type: type.STRING(1024)
        },
        isEmailVerified: {
            type: type.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        imageUrl: {
            type: type.STRING,
            defaultValue: null
        }
      },
      {
        // freezeTableName: true,
        hooks: {
            beforeCreate: (user) => {
              const salt = bcrypt.genSaltSync();
              user.password = bcrypt.hashSync(user.password, salt);
            },
          },
      }
    );
    User.prototype.validPassword= function(password) {
        return bcrypt.compareSync(password, this.password);
      }
return User;
}
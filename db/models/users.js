const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../../config").secret;
const md5 = require("md5");

const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define(
  "users",
  {
    username: {
      type: Sequelize.STRING
    },

    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.BOOLEAN
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password_digest: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.VIRTUAL,
      validate: {
        notEmpty: true
      }
    },

    // GOOGLE
    googleUsername: {
      type: Sequelize.STRING
    },

    googleId: {
      type: Sequelize.STRING
    },

    googleAccessToken: {
      type: Sequelize.STRING
    },

    googleRefreshToken: {
      type: Sequelize.STRING
    },

    googlePhoto: {
      type: Sequelize.STRING
    },

    // FACEBOOK
    facebookUsername: {
      type: Sequelize.STRING
    },

    facebookId: {
      type: Sequelize.STRING
    },

    facebookAccessToken: {
      type: Sequelize.STRING
    },
    facebookRefreshToken: {
      type: Sequelize.STRING
    }
  },
  {
    indexes: [{ fields: ["email"], unique: true }],

    hooks: {
      beforeCreate: setEmailAndPassword,
      beforeUpdate: setEmailAndPassword
    },

    instanceMethods: {
      authenticate(plaintext) {
        return new Promise((resolve, reject) =>
          bcrypt.compare(plaintext, this.password_digest, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
        );
      },

      createGravatar() {
        return `https://www.gravatar.com/avatar/${md5(this.email)
          .toLowerCase()
          .trim()}`;
      },

      generateJWT() {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign(
          {
            id: this.id,
            email: this.email,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            gravatar: this.createGravatar(),
            photo: this.googlePhoto || null,
            exp: parseInt(exp.getTime() / 1000)
          },
          secret
        );
      },

      toAuthJSON() {
        return {
          token: this.generateJWT()
        };
      }
    }
  }
);

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase();
  if (!user.password) return Promise.resolve(user);

  return new Promise((resolve, reject) =>
    bcrypt.hash(user.get("password"), 10, (err, hash) => {
      if (err) reject(err);
      user.set("password_digest", hash);
      resolve(user);
    })
  );
}

module.exports = User;

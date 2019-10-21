const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const { Users } = require('./../../models');

const router = express.Router();

const validatorSignUp = [
    check('firstName')
        .exists()
        .withMessage('First name is required field')
        .isLength({
            min: 3,
            max: 15,
        })
        .withMessage('First name must be at no less 3 characters and no more than 15 characters'),
    check('lastName')
        .exists()
        .withMessage('Last name is required field')
        .isLength({
            min: 3,
            max: 15,
        })
        .withMessage('Last name must be at no less 3 characters and no more than 15 characters'),
    check('userEmail')
        .exists()
        .withMessage('User email is required field')
        .isEmail()
        .withMessage('Invalid email address'),
    check('userPassword')
        .exists()
        .withMessage('User password is required field')
        .isLength({
            min: 6,
        })
        .withMessage('Password must not be less than 6 characters')
        .matches(/\d/)
        .withMessage('User password is required field'),
];

// handles url http://localhost:8081/api/users/signup/
router.post('/signup', validatorSignUp, async (req, res) => {
    try {
        const { errors } = validationResult(req);
        if (errors[0]) {
            throw new Error(errors[0].msg);
        }
        const { firstName, lastName, userEmail, userPassword } = req.body;
        const salt = +process.env.SALT;
        const password = await bcrypt.hash(userPassword, salt);
        const user = (await Users.findAll({ where: { user_email: userEmail } }))[0];
        if (user) {
            throw new Error('A user with that email address already exists.');
        }
        const { user_id } = await Users.create({
            first_name: firstName,
            last_name: lastName,
            user_email: userEmail,
            user_password: password,
        });
        const JWTToken = getJWT(user_id, firstName, lastName, userEmail);
        return res.status(200).json({
            success: 'Welcome to my app',
            userId: user_id,
            token: JWTToken,
        });
    } catch (err) {
        return res.status(422).json({
            err: err.message,
        });
    }
});

module.exports = router;

function getJWT(userId, firstName, lastName, userEmail) {
    const secret = process.env.SECRET;
    const expires = +process.env.EXPIRES;
    return jwt.sign(
        {
            userId,
            userEmail,
            firstName,
            lastName,
        },
        secret,
        {
            expiresIn: expires,
        },
    );
}

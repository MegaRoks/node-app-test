const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const db = require('./../../db');
const SignIn = require('../../modules/user/SignIn.model');

const router = express.Router();

const validatorSignIn = [
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

// handles url http://localhost:8081/api/users/signin/
router.post('/signin', validatorSignIn, async (req, res) => {
    try {
        const { errors } = validationResult(req);
        if (errors[0]) {
            throw new Error(errors[0].msg);
        }
        const { userEmail, userPassword } = req.body;
        const signIn = new SignIn(userEmail);
        const user = (await db.query(signIn.getUserByEmail())).rows[0];
        if (!user) {
            throw new Error('A user with that email address already exists.');
        }
        const result = await bcrypt.compare(userPassword, user.user_password);
        if (!result) {
            throw new Error('Wrong email, username or password');
        }
        const JWTToken = await getJWT(user);
        return res.status(200).json({
            success: 'Welcome to my app',
            token: JWTToken,
            userId: user.user_id,
        });
    } catch (err) {
        return res.status(422).json({
            err: err.message,
        });
    }
});

module.exports = router;

function getJWT(user) {
    const secret = process.env.SECRET;
    const expires = +process.env.EXPIRES;
    return jwt.sign(
        {
            userId: user.user_id,
            userEmail: user.user_email,
            firstName: user.first_name,
            lastName: user.last_name,
        },
        secret,
        {
            expiresIn: expires,
        },
    );
}

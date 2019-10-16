const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const moment = require('moment');

const db = require('./../../db');
const SingUp = require('./../../modules/user/singUp.model');

const router = express.Router();

const validatorSignUp = [
    check('firstName')
        .exists()
        .withMessage('User password is required field')
        .isLength({
            min: 3,
            max: 15,
        })
        .withMessage('First name must be at no less 3 characters and no more than 15 characters'),
    check('lastName')
        .exists()
        .withMessage('User password is required field')
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
        const firstName = +req.body.firstName;
        const lastName = req.body.lastName;
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;
        const salt = +process.env.SALT;
        const password = await bcrypt.hash(userPassword, salt);
        const createDate = moment().format();
        const singUp = new SingUp(firstName, lastName, userEmail, password, createDate);
        const { user_exists } = (await db.query(singUp.getUserByEmail())).rows[0];
        if (user_exists) {
            throw new Error('A user with that email address already exists.');
        }
        const { user_id } = (await db.query(singUp.addUser())).rows[0];
        return res.status(200).json({
            user_id,
        });
    } catch (err) {
        return res.status(422).json({
            err: err.message,
        });
    }
});

module.exports = router;

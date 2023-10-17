'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const {body, getErrorMessage} = require('../controllers/validator');
const controllers = require('../controllers/productsController');

router.get('/login', controller.show);
router.post('/login',
    body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid email address!'),
    body('password').trim().notEmpty().withMessage('Password is required!'),
    (req, res, next) =>{
        let message = getErrorMessage(req);
        if (message){
            return res.render('login', {loginMessage: message});
        }
        next();
    },
    controller.login
);

router.get('/logout', controller.logout)

router.post('/register',
    body('firstName').trim().notEmpty().withMessage('First Name is required!'),
    body('lastName').trim().notEmpty().withMessage('Last Name is required!'),
    body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid Email address!'),
    body('password').trim().notEmpty().withMessage('Password is required!'),
    body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage('Password must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters!'),
    body('confirmPassword').custom((confirmPassword, {req}) => {
        if (confirmPassword != req.body.password){
            throw new Error('Passsword not match!');
        }
        return true;
    }),
    (req, res, next) => {
        let message = getErrorMessage(req);
        if (message){
            return res.render('login', {registerMessage: message});
        }
        next();
    }
    , controller.register
);

router.get('/forgot-password',controller.showForgotPassword);

router.post('/forgot-password',
    body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid Email address!'),
    (req, res, next) => {
        let message = getErrorMessage(req);
        if (message){
            return res.render('forgot-password', {message: message});
        }
        next();
    },
    controller.forgotPassword
);

router.get('/reset', controller.showResetPassword);

router.post('/reset',
body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid Email address!'),
body('password').trim().notEmpty().withMessage('Password is required!'),
body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage('Password must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters!'),
body('confirmPassword').custom((confirmPassword, {req}) => {
    if (confirmPassword != req.body.password){
        throw new Error('Passsword not match!');
    }
    return true;
}),
(req, res, next) => {
    let message = getErrorMessage(req);
    if (message){
        return res.render('reset-password', {message: message});
    }
    next();
},
controller.resetPassword
);

module.exports = router;
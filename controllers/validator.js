'use strict';

const {body, validationResult} = require('express-validator');

function getErrorMessage(req){
    let errors = validationResult(req);
    if (!errors.isEmpty()){
        return errorArray.reduce((message, error)=>{
            return message + error.msg + "<br/>"
        },'');
    }
    return null;
}

module.exports = {body, getErrorMessage}
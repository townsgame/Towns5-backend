var check = require('validator');

// checks alpha numeric strings + space
function isAlphanumericstring(value) {
    // to prevent XSS we check only that it doesn't contain dangerous characters
    return value === check.escape(value);
}

// checks valid Type
function typesOfObjects(value) {
    return check.isIn(value, ['building', 'terrain', 'story']);
}

//checks the valid Subtype
function subtypesOfObjects(value) {
    // todo: define what subtypes are allowed
    return true;
}

// checks that locale has only alphabet characters
function isAlphabetic(value) {
    return /^[a-zA-Z]*$/i.test(value);
}

// checks that value has two characters
function hasTwoCharacters(value) {
    return value.length === 2 || value.length === 0;
}

function isMongoId(value) {
    // TODO: temporarily allow admin as value, remove after AUTH is implemented
    return check.isMongoId(value) || value == "admin";
}

function isPositiveInteger(value) {
    return check.isInt(value) && value >= 0;
}

function isValidCoordinate(value) {
    return check.isFloat(value.valueOf());
}

function isValidDate(value) {
    return check.isDate(value);
}

function isCurrentDate(value) {
    var beforeDate = new Date();
    var afterDate = new Date();
    beforeDate.setSeconds(beforeDate.getSeconds()-5);
    afterDate.setSeconds(afterDate.getSeconds()+5);
    return check.isBefore(beforeDate, value) && check.isAfter(afterDate, value);
}

function isObjectId(value) {
    return check.isMongoId(value);
}

function isBcryptHash(value) {
    //TODO: validate bcrypt string. No plain text password is allowed to be saved.
    return true;
}

function isValidUsername(value) {
    return value !== null && value.length > 0 && value.length <= 128 && value === check.escape(value);
}

function isValidPassword(value) {
    return value !== null && value.length > 0 && value === check.escape(value);
}

var is = {
    validObjectName: [isAlphanumericstring, '{VALUE} is not alphanumeric'],
    validObjectType: [typesOfObjects, '{VALUE} is not valid TYPE!'],
    validObjectSubType: [subtypesOfObjects, '{VALUE} is not valid SUBTYPE!'],
    validObjectVersion: [isPositiveInteger, '{VALUE} needs to be positive integer'],
    validObjectCoordinate: [isValidCoordinate, '{VALUE} is not valid coordinate. Coordinate must be float number.'],
    validDate: [ isValidDate, '{VALUE} is not a date in correct format' ],
    validCurrentDate: [
        { 'validator': isValidDate, msg: '{VALUE} is not a date in correct format'},
        { 'validator': isCurrentDate, msg: '{VALUE} is not current date'}
    ],
    validObjectLocale: [
        { 'validator': isAlphabetic, msg: '{VALUE} is not valid locale! Locale must be in ISO 3166-1 alpha-2 format.', type: 'ISO 3166-1 alpha-2 format'},
        {'validator': hasTwoCharacters, msg: '{VALUE} must be 2 characters long', type: 'length'}
    ],
    validOwnerId: [isMongoId, '{VALUE} is not a valid Owner Id'],
    validObjectId: [isObjectId, '{VALUE} is not a valid Object Id'],
    validBcryptHash: [isBcryptHash, '{VALUE} is not a bcrypt hash'],
    validUsername: [isValidUsername, '{VALUE} is not valid username'],
    validPassword: [isValidPassword, '{VALUE} is not valid password']
};

module.exports = is;
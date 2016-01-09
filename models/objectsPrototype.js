var db = require('./db');

var prototypeSchema = new db.Schema({
    name: String,
    type: {type: String, required: true},
    subtype: String,
    locale: {type: String, default: "cs"},
    design: {
        type: {type: String},
        data: {type: String}
    },
    content: {
        type: {type: String, default: "markdown"},
        data:  {type: String}
    },
    properties: {
        strength: {type: Number},
        defense: {type: Number},
        speed: {type: Number}
    },
    actions: Array
}, {
    collection: 'objectsPrototypes'
});

var objectsPrototype = db.model('objectsPrototypes', prototypeSchema, 'objectsPrototypes');
module.exports = objectsPrototype;
var express = require('express');
var router = express.Router();
var Object = require('../models/object');
var ObjectsPrototype = require('../models/objectsPrototype');

/**
 * GET /objects
 * vrati vsetky objekty
 */
router.get('/', function(req, res, next) {
    Object.find(function(err, objects) {
        if (err) { return next()}
        res.json(objects)
    });
});

/**
 * POST /objects
 * Vytvor odoslany objekt
 */
router.post('/', function(req, res, next) {
    var newObject = {},
        json = req.body;
    //console.log(req.body);

    // check that mandatory values are set
    if(!json.hasOwnProperty('prototypeId') || !json.hasOwnProperty('x') || !json.hasOwnProperty('y')) {
        // mandatory validation failed
    }

    // find the Prototype
    ObjectsPrototype.findOne({type: "building"}, function(err, objectsPrototype) {
        if (err) { return next() }
        //console.log(objectsPrototype);
        for (var key in objectsPrototype._doc) {
            if (objectsPrototype._doc.hasOwnProperty(key) && key !== "_id") {
                newObject[key] = objectsPrototype["_doc"][key];
            }
        }

        // set the other values
        newObject.version = 1;
        newObject.x = json.x;
        newObject.y = json.y;
        newObject.name = json.name;
        newObject.start_time = Date.now();
        if(json.hasOwnProperty('content') ) {
            var type = json.content.hasOwnProperty('type') ? json.content.type : "";
            var data = json.content.hasOwnProperty('data') ? json.content.data : "";
            newObject.content = {
                type: type,
                data: data
            };
        }
        if(json.hasOwnProperty('design') ) {
            var type = json.design.hasOwnProperty('type') ? json.design.type : "";
            var data = json.design.hasOwnProperty('data') ? json.design.data : "";
            newObject.design = {
                type: type,
                data: data
            };
        }
        newObject.owner = "admin";

        var object = new Object(newObject);

        console.log(newObject);
        // save the newly created object to DB
        object.save(function (err, object) {
            if (err) { return next(err) }
            res.status(201).json({
                "status": "ok",
                "objectId": object._id
            })
        });

    });

});

/**
 * GET /objects/prototypes
 * vrati vsetky prototypu objektov
 */
router.get('/prototypes', function(req, res, next) {
    ObjectsPrototype.find(function(err, objectsPrototypes) {
        if (err) { return next()}
        res.json(objectsPrototypes)
    });
});

/**
 * POST /objects/prototypes
 * Vytvor odoslany prototyp objektu
 */
router.post('/prototypes', function(req, res, next) {
    var newPrototype = {},
        json = req.body;

    // check that mandatory values are set
    if(!json.hasOwnProperty('type')) {
        // mandatory validation has failed
    }


    newPrototype.name = json.hasOwnProperty('name') ? json.name : "";
    newPrototype.type = json.hasOwnProperty('type') ? json.type : "";
    newPrototype.subtype = json.hasOwnProperty('subtype') ? json.subtype : "";
    newPrototype.locale = json.hasOwnProperty('locale') ? json.locale : "";
    if(json.hasOwnProperty('design') ) {
        type = json.design.hasOwnProperty('type') ? json.design.type : "";
        data = json.design.hasOwnProperty('data') ? json.design.data : "";
        newPrototype.design = {
            type: type,
            data: data
        };
    }
    if(json.hasOwnProperty('content') ) {
        type = json.content.hasOwnProperty('type') ? json.content.type : "";
        data = json.content.hasOwnProperty('data') ? json.content.data : "";
        newPrototype.content = {
            type: type,
            data: data
        };
    }
    if(json.hasOwnProperty('properties')) {
        var properties = json.properties;
        for (var key in properties) {
            if (properties.hasOwnProperty(key)) {
                if(!newPrototype.hasOwnProperty("properties")){
                    newPrototype.properties = {};
                }
                newPrototype["properties"][key] = properties[key];
            }
        }
    }
    newPrototype.actions = json.hasOwnProperty('actions') ? json.actions : "";
    newPrototype.owner = "admin";
    //console.log(newPrototype);
    var prototype = new ObjectsPrototype(newPrototype);

    // save the newly created prototype of object to DB
    prototype.save(function (err, object) {
        if (err) { return next(err) }
        res.status(201).json({
            "status": "ok",
            "objectId": object._id
        })
    });


});

/**
 * GET /objects/:id
 * Vypytaj len objekt s id
 */
router.get('/:id', function(req, res) {
    Object.findOne({"_id": req.params.id}, function(err, object) {
        if (err) { return next()}
        res.json(object)
    })
});

/**
 * POST /objects/:id
 * Update object with id, according to json sent in body
 */
router.post('/:id', function (req, res) {
    Object.findOne({"_id": req.params.id}, function(err, object) {
        if (err) { return next()}

        var objectHistory = {},
            json = req.body;

        // todo: create copy of current object in Objects history

        // todo: increase version by 1 of current object

        // todo: make changes on object from json

        // save the updated object to DB
        object.save(function (err, object) {
            if (err) { return next(err) }
            res.status(200).json({
                "status": "ok",
                "objectId": object._id,
                "version": object.version
            })
        });

    })
});

/**
 * DELETE /objects/:id
 * Vymaz objekt s danym id
 */
router.delete('/', function (req, res) {
    res.json({ DELETE: 'Vymaz objekt s id' + req.params.id});
});


module.exports = router;
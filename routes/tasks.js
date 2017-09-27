var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var hostname = 'localhost';
var port = 27017;
var database = "myDB";
var db = mongojs("mongodb://troy:troy123@" + hostname + ":" + port + "/" + database, ['Tasks']);

// Get All Tasks
router.get('/tasks', function(req, res, next) {
    db.Tasks.find(function(err, tasks) {
        if(err) {
            res.send(err);
        } 
        res.json(tasks);
    })
});

// Get Single Task By Id
router.get('/task/:id', function(req, res, next) {
    db.Tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
        if(err) {
            res.send(err);
        } 
        res.json(task);
    })
});

// Get Single Task By Not Done
router.get('/task/isDone/:isDone2', function(req, res, next) {
    var isDone1 = req.params.isDone2;
    db.Tasks.find({isDone: false}, function(err, tasks) {
        if(err) {
            res.send(err);
        } 
        console.log("DEBUG: " + req.params.isDone==true);
        console.log("Found " + (req.params.isDone==true?"completed":"incomplete") + " tasks.");
        console.log(tasks);
        res.json(tasks);
    })
});

// Save Task
router.post('/task', function(req, res, next) {
    if(err) {
        res.send(err);
    } 
    var task = req.body;
    if(!task.title || (task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.Tasks.save(task, function(err, task) {
            if(err) {
                res.send(err);
            } 
            res.json(task);
        });
    }
});

// Delete Task
router.delete('/task/:id', function(req, res, next) {
    db.Tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
        if(err) {
            res.send(err);
        } 
        res.json(task);
    })
});

// Update Task
router.put('/task/:id', function(req, res, next) {
    var task = req.body;
    var updTask = {};

    if(task.isDone) {
        updTask.isDone = task.isDone;
    }
    if(task.Title) {
        updTask.Title = task.Title;
    }
    if(!updTask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }

    else {
        db.Tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task) {
            if(err) {
                res.send(err);
            } 
            res.json(task);
        })
    }   
});

module.exports = router;

var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/MVidApp');

router.get('/', function(req, res) {
    var collection = db.get('videos');
    collection.find({user_id: req.user.username}, function(err, videos){
        if (err) throw err;
      	res.json(videos);
    });
});

router.post('/', function(req, res){
    var collection = db.get('videos');
    collection.insert({
        title: req.body.title,
        description: req.body.description,
        user_id: req.user.username,
        picture: req.body.title

    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('videos');
    collection.findOne({ _id: req.params.id }, function(err, video){
        if (err) throw err;

      	res.json(video);
    });
});

router.put('/:id', function(req, res){
    var collection = db.get('videos');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        user_id: req.user.username,
        description: req.body.description,
        picture: req.body.title
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

router.delete('/:id', function(req, res){
    var collection = db.get('videos');
    collection.remove({ _id: req.params.id }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

module.exports = router;
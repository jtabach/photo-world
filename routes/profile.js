'use strict';

var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var each = require('async-each');
var multer = require('multer');

var s3 = new AWS.S3();
var upload = multer({ storage: multer.memoryStorage() });

require('dotenv').config();

var authMiddleware = require('../config/auth');

var User = require('../models/user');
var Album = require('../models/album');
var Photo = require('../models/photo');

router.use(authMiddleware);

/* GET user's profile page and display */
router.get('/', function(req, res, next){
  User.findById(req.user._id, function(err, user) {
    if (err) return res.status(400).send(err);
    res.render('profile', {user: user});
  });
});

router.get('/changePassword', function(req, res){
  res.render('changePassword');
});

router.get('/newAlbum', function(req, res) {
  res.render('newAlbum');
});

router.post('/newAlbum', function(req, res) {
  var newAlbum = req.body;
  newAlbum.userId = req.user._id;
  Album.create(newAlbum, function(err, savedAlbum) {
    if (err) return res.status(400).send('error adding album', err);
    res.status(200).send('album added');
  });
});

router.get('/myAlbums', function(req, res) {
  Album.find({userId:req.user._id}, function(err, albums) {
    console.log(albums);
    if (err) return res.status(400).send('error finding albums', err);
    res.render('myAlbums', {albums: albums});
  })
})

router.get('/album/:albumId', function(req, res) {
  Album.findById(req.params.albumId, function(err, album){
    if (err) return res.status(400).send(err);
    Photo.find({albumId: req.params.albumId}, function(err, photos){
      if (err) return res.status(400).send(err);
      res.render('album', {album:album, photos: photos});
    });
  });
});

router.post('/album/:albumId', upload.array('images'), function(req, res) {
  each(req.files, function(file, next) {
    var filename = file.originalname;
    var ext = filename.match(/\.\w+$/)[0] || '';
    var key = uuid.v1() + ext;
    var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: key,
      Body: file.buffer
    };

    s3.putObject(params, function(err, data) {
      if (err) return res.status(400).send(err);
      var url = process.env.AWS_URL + "/" + process.env.AWS_BUCKET + "/" + key;
      var photo = new Photo({
        title: filename,
        photoUrl: url,
        albumId: req.params.albumId
      });

      photo.save(function(){
        next();
      });
    });
  }, function(err, contents) {
    if (err) return res.status(400).send(err);
    res.redirect('/profile/album/' + req.params.albumId);
  });
});

router.get('/photo/:photoId', function(req, res) {
  Photo.findById(req.params.photoId, function(err, photo) {
    if (err) return res.status(400).send(err);
    res.render('photo', {photo: photo});
  });
});

router.delete('/photo/:photoId', function(req, res) {
  Photo.findByIdAndRemove(req.params.photoId, function(err, photo) {
    if (err) return res.status(400).send(err);
    res.send(photo.albumId);
  })
})

module.exports = router;

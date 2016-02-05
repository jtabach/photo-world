'use strict';

var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var uuid = require('node-uuid');

var s3 = new AWS.S3();

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
    Photo.find({userId: req.user._id, available: true}, function(err, photos){
      if (err) return res.status(400).send(err);
      res.render('album', {album:album, photos: photos});
    });
  });
});

function errorHandler(res, type, err, descr) {
  if (err) return res.status(400).send(descr, err);
}

module.exports = router;

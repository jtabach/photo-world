'use strict';

var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  },
  title: {type: String, default: 'title unknown'},
  // date: {type: Boolean, default: true},
  photoUrl: {type: String, default: "http://i.imgur.com/sJ3CT4V.gif"}
});

var Photo = mongoose.model('Book', photoSchema);

module.exports = Photo;

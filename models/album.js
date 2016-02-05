'use strict';

var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {type: String, default: 'title unknown'},
  // date: {type: Boolean, default: true},
  photoUrl: {type: String, default: "http://i.imgur.com/sJ3CT4V.gif"}
});

var Album = mongoose.model('Book', albumSchema);

module.exports = Album;

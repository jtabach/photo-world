'use strict';

var mongoose = require('mongoose');
var moment = require('moment');

var photoSchema = new mongoose.Schema({
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  },
  title: {type: String, default: 'title unknown'},
  date: {type: String, default: moment(Date.now()).format('LL')},
  privacy: {type: String},
  photoUrl: {type: String, default: "http://www.drphillipscenter.org/resources/images/default.jpg"}
});

var Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;

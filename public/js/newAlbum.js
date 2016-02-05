'use strict';

$(function() {
  $('form').on('submit', addAlbum);
});

function addAlbum(e) {
  console.log('ok');
  e.preventDefault();
  var newAlbum = {};
  newAlbum.title = $('#title').val() || 'title unknown';
  newAlbum.photoUrl = $('#photoUrl').val() || "http://www.drphillipscenter.org/resources/images/default.jpg";

  $.post('/profile/newAlbum', newAlbum)
  .success(function(data) {
    location.href = '/profile';
  }).
  fail(function(err) {
    console.log('error adding book:', err);
  });
}

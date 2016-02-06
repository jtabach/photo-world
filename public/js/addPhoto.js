// 'use strict';
//
// $(function() {
//   $('form').on('submit', addPhoto);
// });
//
// function addPhoto(e) {
//   console.log('ok');
//   e.preventDefault();
//   var newPhoto = {};
//   var albumId = $(this).find('button').data('album');
//   newPhoto.privacy = $('#privacy').val();
//   console.log(newPhoto.privacy);
//   console.log(albumId);
//
//   $.ajax({
//     url: `/profile/album/${albumId}`,
//     method: "POST",
//     data: newPhoto,
//     enctype: 'multipart/form-data'
//   })
//   .success(function(data) {
//     location.href = '/profile/myAlbums';
//   }).
//   fail(function(err) {
//     console.log('error adding book:', err);
//   });
// }

'use strict';

$(function() {
  $('.deletePhoto').on('click', confirmDelete);
  $('.coverPhoto').on('click', coverPhoto);
});

function confirmDelete() {
  var $this = $(this);
  swal({
    title: "Are you sure you want to delete this photo?",
    text: "It will be permanently removed from your album",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false
  },
  function(){
    deletePhoto($this);
  })
}

function deletePhoto($this) {
  var photoId = $this.data('photo');
  $.ajax({
    url: `/profile/photo/${photoId}`,
    method: 'DELETE'
  })
  .success(function(albumId) {
    location.href = `/profile/album/${albumId}`
  })
  .fail(function(err) {
    console.log(err);
  })
}

function coverPhoto() {
  var photoId = $(this).data('photo');
  $.ajax({
    url: `/profile/newCover/${photoId}`,
    method: 'PUT'
  })
  .success(function(data) {
    console.log('new cover photo')
    // location.href = `/profile/myAlbums`
  })
  .fail(function(err) {
    console.log(err);
  });
}

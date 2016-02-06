'use strict';

$(function() {
  $('.deletePhoto').on('click', confirmDelete);
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
  swal()

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

'use strict';

$(function() {
  $('#deleteAlbum').on('click', confirmDeleteAlbum);
});

function confirmDeleteAlbum() {
  var $this = $(this);
  swal({
    title: "Are you sure you want to delete this Album?",
    text: "You will permanently delete this album and all associated photos",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false
  },
  function(){
    deleteAlbum($this);
  })
}

function deleteAlbum($this) {
  var albumId = $this.data('album');
  $.ajax({
    url: '/profile/album/delete',
    method: 'DELETE',
    data: {albumId: albumId}
  })
  .success(function(data) {
    location.href = '/profile/myAlbums'
  })
  .fail(function(err) {
    console.log(err);
  })
}

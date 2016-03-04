'use strict';

app.factory('ProductFactory', function ($http) {

  var ProductFactory = {};

  ProductFactory.fetchAll = function () {
    return $http.get('/api/albums')
    .then(response => response.data)
    .then(albums => albums.map(ProductFactory.convert) );
  };

  ProductFactory.fetchById = function (id) {
    return $http.get('/api/albums/' + id)
    .then(response => response.data)
    .then(ProductFactory.convert)
    .then(album => {
      album.songs = album.songs.map(SongFactory.convert);
      return album;
    });
  };

  ProductFactory.convert = function (album) {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    return album;
  };

  return ProductFactory;

});
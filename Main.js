
//goog.require('goog.Uri');
//goog.require('goog.net.BulkLoader');

function main() {
  console.log("In ImageLoader.main()");
  //
  // Try a URL for an image known to work no matter where you are.  First see if it exists, and
  // if so display it.
  //
  var initialTileUrl = 'https://maps.gvs.nga.mil/arcgis/rest/services/Basemap/NGA_ShadedRelief_2D/MapServer/tile/0/0/0';
  console.log("ImageLoader.main, calling imageResourceTest(initialTileUrl), which is asynchronous.");
  imageResourceTest(initialTileUrl); // this does not block, listens for the image to come in
  console.log("ImageLoader.main, back from calling imageResourceTest(initialTileUrl), which was asynchronous.");

  console.log("ImageLoader.main, calling imageResourceTest(initialTileUrl), which was asynchronous.");
  imageLoader(initialTileUrl); // This does not block either.  Listener for a load, or error, and when is done
  console.log("ImageLoader.main, back from calling imageResourceTest(initialTileUrl), which was asynchronous.");


  var imageUrlBase = 'https://test.msat.akimeka.com/weather/WMS?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&STYLE=default&FORMAT=image/png;mode=8bit&CRS=CRS:84&LAYER=';
  var imageUrls = [
  imageUrlBase + 'lightning',
  imageUrlBase + 'DCF_Cloud_Cover',
  imageUrlBase + 'NEXRAD_Radar_Precip',
  imageUrlBase + 'Surface_Ice_Concentration_Analysis',
  imageUrlBase + 'IWWC',
  imageUrlBase + 'Surface_Temperature_Analysis_in_F',
  imageUrlBase + 'Surface_Visibility_Analysis',
  imageUrlBase + 'Tropical_Storm_Forecast', // no image available
  imageUrlBase + 'Surface_Wind_Analysis'
  ];
  console.log("ImageLoader.main, calling imagesLoader(imageUrls)");
  imagesLoader(imageUrls); // this does not block, but listens for each load, error, and when all is done
  console.log("ImageLoader.main, back from calling imagesLoader(imageUrls)");
  //var bulkLoader = new goog.net.BulkLoader(ImageUrls); // not the best way to load images, but can be used for loading other stuff
  console.log("Leaving ImageLoader.main()");
}


// // var imageUrl = 'https://maps.gvs.nga.mil/arcgis/rest/services/Basemap/NGA_ShadedRelief_2D/MapServer/tile/0/0/0';
// var imageUrlBase = 'https://test.msat.akimeka.com/weather/WMS?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&STYLE=default&FORMAT=image/png;mode=8bit&CRS=CRS:84&LAYER=';
// var imageUrls = [
//   //initialTile
//   imageUrlBase + 'lightning',
//   imageUrlBase + 'DCF_Cloud_Cover',
//   imageUrlBase + 'NEXRAD_Radar_Precip',
//   imageUrlBase + 'Surface_Ice_Concentration_Analysis',
//   imageUrlBase + 'IWWC',
//   imageUrlBase + 'Surface_Temperature_Analysis_in_F',
//   imageUrlBase + 'Surface_Visibility_Analysis',
//   imageUrlBase + 'Tropical_Storm_Forecast', // no image available
//   imageUrlBase + 'Surface_Wind_Analysis'
// ];
//
// var failedImages = [];
// var loadedImages = [];
//
// var imageLoader = new goog.net.ImageLoader();
//
// // imageLoader.listen(goog.events.EventType.LOAD, function(e) {
// //   console.log("Got a LOAD event for " + e.target.id);
// // });
// // imageLoader.listen(goog.events.EventType.ERROR, function(e) {
// //   console.log("Got an ERROR event for " + e.target.id);
// // });
// // imageLoader.listen(goog.events.EventType.COMPLETE, function(e) {  // doesn't fire?
// //   console.log("Got a COMPLETE event for all images the loader knew about.")
// // });
//
//
// //
// // When legend images are successfully loaded, or error'd,
// // update the corresponding lists of image urls,
// // and when they're all done, deal with these lists.
// // I think it's possible to specisy that a resource needs user authentication, somewhere.
// //
// goog.events.listen(imageLoader, imageEventTypes, function(e) {
//   if (e.type == goog.events.EventType.LOAD) {
//     loadedImages.push(e.target); // e.target is an Image object, and has naturalHeight, naturalWidth
//   } else if (e.type == goog.net.EventType.ERROR) {
//     failedImages.push(e.target);
//   } else if (e.type == goog.net.EventType.COMPLETE) {
//     // done trying to load legend images, so use the lists
//     if (failedImages.length) {
//       dealWithFailedImages(failedImages);
//     }
//     if (loadedImages.length) {
//       useLoadedImages(loadedImages);
//     }
//     imageLoader.dispose();
//   }
// });
//
// for (var imageCtr = 0; imageCtr < imageUrls.length; imageCtr++) {
//   var id = goog.isString(imageUrls[imageCtr]) ? imageUrls[imageCtr] : imageUrls[imageCtr].src;
//   imageLoader.addImage(id, imageUrls[imageCtr]);
// }
// var imageId = goog.isString(imageUrl) ? imageUrl : imageUrl.src;
// //imageLoader.addImage(imageId, initialTile, goog.net.ImageLoader.CorsRequestType.USE_CREDENTIALS);
// //imageLoader.addImage(imageId, initialTile, goog.net.ImageLoader.CorsRequestType.ANONYMOUS);
// imageLoader.addImage(imageId, imageUrl);
//
// // Start the loading of images in parallel, firing a LOAD event for each successfully loaded image,
// // and an ERROR for those that couldn't, and a COMPLETE event when all are loaded.
// imageLoader.start();
// // gotta wait around for a while before we get any callbacks from loading or attempted loading
//
// //imageLoader.removeImage(id); // just for fun.  Not nec.  Maybe harmful.

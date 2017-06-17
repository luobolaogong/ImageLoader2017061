//goog.require('goog.net.BulkLoader');
goog.require('goog.net.ImageLoader');
goog.require('goog.events.Listener');
goog.require('goog.Uri');
goog.require('goog.net.NetworkTester');

//
// Closure's ImageLoader, with an event listener is the best way to check for existence of
// images from a service.  It doesn’t require an image tag, and you can check for
// errors easily, and it works on all browsers.  It is an asynchronous thing
// and you should wait until an event is generated indicating success or failure
// and that it's done, before you do something with the results.  But an error
// should come back fairly quickly, I think if there is a problem.
//
// Here we just want to test all, or maybe just one image at a time.
//

// Single image loader
function imageLoader(imageUrl) {
  console.log("In ImageLoader.js.imageLoader(imageUrl): " + imageUrl);
  var imageLoader = new goog.net.ImageLoader();

  var imageEventTypes = [
    goog.events.EventType.LOAD,
    goog.net.EventType.ERROR,
    goog.net.EventType.COMPLETE
  ];
  goog.events.listen(imageLoader, imageEventTypes, function(e) {
    if (e.type == goog.events.EventType.LOAD) {
      var image = e.target; // e.target is an Image object, and has naturalHeight, naturalWidth
      console.log("Got a load event from imageLoader, and an image, and will display it.  Image height: " + image.naturalHeight);
      displayImage(image);
    } else if (e.type == goog.net.EventType.ERROR) {
      console.log("!!!!!!!!!!!!!1Some kinda error with imageLoader for the single image, maybe it's " + e.target.src);
    } else if (e.type == goog.net.EventType.COMPLETE) {
      console.log("ImageLoader says that all images added to it have finished being processed.");
      imageLoader.dispose();
    }
  });
  var imageId = goog.isString(imageUrl) ? imageUrl : imageUrl.src;
  //imageLoader.addImage(imageId, initialTile, goog.net.ImageLoader.CorsRequestType.USE_CREDENTIALS);
  //imageLoader.addImage(imageId, initialTile, goog.net.ImageLoader.CorsRequestType.ANONYMOUS);
  imageLoader.addImage(imageId, imageUrl);
  imageLoader.start();
  console.log("Leaving ImageLoader.js.imageLoader(imageUrl)");
}

// Here's a way to loaded many images.
function imagesLoader(imageUrls) {
  console.log("In ImageLoader.js.imagesLoader(imageUrls)");
  var loadedImages = [];
  var failedImages = [];
  var imageLoader = new goog.net.ImageLoader();

  var imageEventTypes = [
    goog.events.EventType.LOAD,
    goog.net.EventType.ERROR,
    goog.net.EventType.COMPLETE
  ];
  goog.events.listen(imageLoader, imageEventTypes, function(e) {
    var image = e.target;
    if (e.type == goog.events.EventType.LOAD) {
      loadedImages.push(image);
    } else if (e.type == goog.net.EventType.ERROR) {
      console.log("....................Some kinda error with imageLoader for image from " + e.target.src);
      failedImages.push(image);
    } else if (e.type == goog.net.EventType.COMPLETE) {
      console.log("imageLoader says that all images added to it have finished being processed.");
      useLoadedImages(loadedImages);
      imageLoader.dispose();
    }
  });
  for (var imageUrlsCtr = 0; imageUrlsCtr < imageUrls.length; imageUrlsCtr++) {
    var imageUrl = imageUrls[imageUrlsCtr];

    var imageId = goog.isString(imageUrl) ? imageUrl : imageUrl.src;
    //imageLoader.addImage(imageId, initialTile, goog.net.ImageLoader.CorsRequestType.USE_CREDENTIALS);
    //imageLoader.addImage(imageId, initialTile, goog.net.ImageLoader.CorsRequestType.ANONYMOUS);
    imageLoader.addImage(imageId, imageUrl);
  }
  console.log("imageLoader is loaded up with images, so let's now start it.");
  imageLoader.start();
  console.log("Leaving ImageLoader.js.imagesLoader(imageUrls)");
}

function dealWithFailedImages(failedImages) {
  console.log("In ImageLoader.js.dealWithFailedImages(failedImages)");
  for (var failedImageCtr = 0; failedImageCtr < failedImages.length; failedImageCtr++) {
    console.log("Failed image: " + failedImages[failedImageCtr].src);
  }
  console.log("Leaving ImageLoader.js.dealWithFailedImages(failedImages)");
}
function displayImage(image) {
  console.log("In ImageLoader.js.displayImage(image)");
  var legend = document.createElement("img");
  legend.id = "weather-legend:" + image.id;
  legend.style.position="absolute";
  legend.style.bottom="20px";
  legend.style.left="20px";
  legend.style.zIndex="999";
  legend.src = image.src;
  document.body.appendChild(legend);
  console.log("Leaving ImageLoader.js.displayImage(image)");
}

function useLoadedImages(loadedImages) {
  console.log("In ImageLoader.js.useLoadedImages");
  for (var loadedImageCtr = 0; loadedImageCtr < loadedImages.length; loadedImageCtr++) {
    var loadedImage = loadedImages[loadedImageCtr];
    console.log("Loaded image id: " + loadedImage.id + " height/width: " + loadedImage.naturalHeight + "/" + loadedImage.naturalWidth);
    //console.log("Loaded image: " + loadedImages[loadedImageCtr].image);
    //console.log("Loaded image: " + loadedImages[loadedImageCtr].src);
    var legend = document.createElement("img");
    legend.id = "weather-legend:" + loadedImage.id;
    legend.style.position="absolute";
    legend.style.bottom="20px";
    legend.style.left="20px";
    legend.style.zIndex="999";
//    legend.src = 'https://test.msat.akimeka.com/weather/WMS?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&STYLE=default&FORMAT=image/png;mode=8bit&CRS=CRS:84&LAYER=' + layer.name;
    legend.src = loadedImage.src;
    document.body.appendChild(legend);
  }
  console.log("Leaving ImageLoader.js.useLoadedImages");
}
//    legend.src = 'https://test.msat.akimeka.com/weather/WMS?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&STYLE=default&FORMAT=image/png;mode=8bit&CRS=CRS:84&LAYER=' + layer.name;

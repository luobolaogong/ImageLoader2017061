goog.require('goog.Uri');
// This function was mostly created to see if the initial tile we've been hitting in order
// to cause authentication/authorization to be triggered at GVS, so that subsequent tile
// requests would be okay, and not have to be authorized again.
function imageResourceTest(imageUrl) {
  console.log("In ImageTest.js.imageResourceTest(imageUrl)");
  var imageUri = new goog.Uri(imageUrl);  // need to make sure that goog.Uri is available.  Webstorm add javascript libraries location for closure.  Gotta do that right.  add as dir.
  imageUri.makeUnique(); // to force away from just checking cache
  //var imageResourceTester = new goog.net.NetworkTester(function (isResourceAvailable) {
  var imageResourceTester = new goog.net.NetworkTester(function (isResourceAvailable) {
    if (isResourceAvailable) {
      console.log("imageResourceTest constructor  The image resource is available: " + imageUri.toString());
      return true; // test, wrong
    }
    else {
      console.log("imageResourceTest constructor  The image resource is not available: " + imageUri.toString());
      return false; // test, wrong
    }
  //});
  }, null, "http://www.apple.com");
  console.log("ImageTest.js.imageResourceTest(imageUrl), imageResourceTester: " + imageResourceTester);
  imageResourceTester.setUri(imageUri);
  imageResourceTester.setNumRetries(1); // total of 2 tries
  imageResourceTester.setPauseBetweenRetries(250); // quarter second apart
  imageResourceTester.setTimeout(10000); // total(?) time for all this is 3 sec
  console.log("ImageTest.js.imageResourceTest(imageUrl), Starting the test.  There is no blocking waiting for the image.  Just a callback.")
  imageResourceTester.start();
  console.log("Leaving ImageTest.js.imageResourceTest(imageUrl)");
}


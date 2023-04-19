var images = document.getElementsByTagName('img');
var processedImages = [];
var processedImages = []
let numDetections = 0;
let sexyOption = false;
let censorOption = false;
let isActive = false;

chrome.storage.local.get('isCensorToggled', function (result) {
  console.log(result.isCensorToggled)
  censorOption = result.isCensorToggled;
});

chrome.storage.local.get('isSexyToggled', function (result) {
  console.log(result.isSexyToggled)
  sexyOption = result.isSexyToggled;
});

chrome.storage.local.get('isActive', function (result) {
  console.log(result.isActive)
  isActive = result.isActive;
});


chrome.storage.local.get('detections', function (result) {
  numDetections = result.detections;
});


function getNewImages() {
  let images = document.querySelectorAll('img:not([data-loaded])');
  for (var i = 0; i < images.length; i++) {
    if (images[i].naturalWidth >= 256 && images[i].naturalHeight >= 256) {
      images[i].setAttribute('data-loaded', true);
      let imageSrc = images[i].getAttribute('data-src') || images[i].getAttribute('src');
      chrome.runtime.sendMessage({msg: 'imageClassify', index: i, url: imageSrc}, function({data,index}){
        console.log("URL: " + images[index].src + " Class: " + data.Prediction[0].class);
        if (data.Prediction[0].class === "nude" || data.Prediction[0].class === "sexy") {
          numDetections ++;
          chrome.storage.local.set({'detections': numDetections});
          let fallbackImageUrl = "https://i.ibb.co/h2Fv4q0/Desktop-1.jpg";
          images[index].src = fallbackImageUrl;
          if (images[index].getAttribute('srcset')) {
            images[index].setAttribute('srcset', fallbackImageUrl);
          }
          if (images[index].getAttribute('data-src')) {
            images[index].setAttribute('data-src', fallbackImageUrl);
          }
        }
      });
    }
  }
  setTimeout(getNewImages, 100);
}

getNewImages();


 

  
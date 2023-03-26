var processedImages = [];
var images = document.getElementsByTagName('img');
let numDetections = 0;

function getNewImages() {
  for (var i = 0; i < images.length; i++) {
    if (processedImages.indexOf(images[i]) === -1) {
        chrome.runtime.sendMessage({msg: 'image', index: i, url:images[i].src}, function({data,index}){
          // Backlog: Add image size checker condition
          console.log(data.Prediction[0].class);
            if(data.Prediction[0].class === "nude" || data.Prediction[0].class === "sexy"){
              numDetections ++;
              chrome.runtime.sendMessage({msg:"send", data:numDetections})
              console.log("is nude");
              images[index].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"
            }
        });
        processedImages.push(images[i]);
    }
  }
  setTimeout(getNewImages, 1000);
}

getNewImages();
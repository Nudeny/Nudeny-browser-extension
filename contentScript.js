var processedImages = [];
var images = document.getElementsByTagName('img');
let numDetections = 0;
let sexyOption = false;
let censorOption = false;

chrome.storage.local.get('isSexyToggled', function (result) {
  sexyOption = result.isSexyToggled;
});

chrome.storage.local.get('isCensorToggled', function (result) {
  censorOption = result.isSexyToggled;
});

chrome.storage.local.get('detections', function (result) {
  numDetections = result.detections;
});

// function getNewImages() {
//   for (var i = 0; i < images.length; i++) {
//     if (processedImages.indexOf(images[i]) === -1) {
//         if(!censorOption){
//           chrome.runtime.sendMessage({msg: 'imageClassify', index: i, url:images[i].src}, function({data,index}){
//             // Backlog: Add image size checker condition
//             console.log(data.Prediction[0].class);
//               if(sexyOption){
//                 if(data.Prediction[0].class === "nude" || data.Prediction[0].class === "sexy"){
//                   numDetections ++;
//                   chrome.storage.local.set({'detections': numDetections});
//                   images[index].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"
//                 }
//                 else{
//                   if(data.Prediction[0].class === "nude"){
//                     numDetections ++;
//                     chrome.storage.local.set({'detections': numDetections});
//                     images[index].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"
//                   }
//                 }
//               }        
//           });
//         }
//         else{
//           //Check first if the image is nude then pass it to censor api
//           chrome.runtime.sendMessage({msg: 'imageClassify', index: i, url:old_image_src}, function({data,index}){
//             // Backlog: Add image size checker condition

//             //Check if image is nude
//             console.log(data.Prediction[0].class);
//               if(data.Prediction[0].class === "nude"){
//                 numDetections ++;
//                 chrome.storage.local.set({'detections': numDetections});
//                 // Save old image source
//                 let old_image_src = images[index].src
//                 images[index].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"
//               }
//               // Censor the image first then send message to censor API to 
//               chrome.runtime.sendMessage({msg: 'imageCensor', index: i, url:old_image_src}, function({data,index}){
//                 // Backlog: Add image size checker condition
//                 // Add censor API result
//                 //images[index].src = "s3 bukcet link"
//               });
//           });
//         }
       
//         processedImages.push(images[i]);
//     }
//   }
//   setTimeout(getNewImages, 1000);
// }

// getNewImages();
let sexyOption = false;
let censorOption = false;
let isActive = false;
let numDetections = 0;

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
  getNewImages();
});



function getNewImages() {
  let images = document.querySelectorAll('img:not([data-loaded])');

  const imageUrl = [] ;
  if(isActive){
    for (var i = 0; i < images.length; i++) {

      if (images[i].naturalWidth >= 50 && images[i].naturalHeight >= 50) {
        images[i].setAttribute('data-loaded', true);
        let imageSrc = images[i].getAttribute('data-src') || images[i].getAttribute('src');
        imageUrl[i] = imageSrc
        images[i].src = "https://i.ibb.co/p1Qjj6Z/Desktop-4-1.jpg";
        images[i].style.objectFit = 'contain'
        images[i].style.objectPosition = '50%'
        if (images[i].getAttribute('srcset')) {
          images[i].setAttribute('srcset', "https://i.ibb.co/p1Qjj6Z/Desktop-4-1.jpg");
        }
        if (images[i].getAttribute('data-src')) {
          images[i].setAttribute('data-src', "https://i.ibb.co/p1Qjj6Z/Desktop-4-1.jpg");
        }
        if(censorOption){
            chrome.runtime.sendMessage({msg: 'imageCensor', indexCensor: i, url: imageSrc}, function({dataCensor,indexCensor}){

              if(dataCensor.Prediction[0].url !== ""){
                numDetections+=1;
                chrome.storage.local.set({'detections': numDetections});
                images[indexCensor].src = dataCensor.Prediction[0].url;
                images[indexCensor].style.objectFit = 'contain'
                images[indexCensor].style.objectPosition = '50%'
                if (images[indexCensor].getAttribute('srcset')) {
                  images[indexCensor].setAttribute('srcset', dataCensor.Prediction[0].url);
                }
                if (images[indexCensor].getAttribute('data-src')) {
                  images[indexCensor].setAttribute('data-src', dataCensor.Prediction[0].url);
                }
                chrome.runtime.sendMessage({msg: 'send'}, function(){
                  chrome.storage.local.set({ 'detections': numDetections});
                  
                });
              }
              else{
                chrome.runtime.sendMessage({msg: 'imageClassify', index: indexCensor, url: imageSrc}, function({data,index}){
                  if (data.Prediction[0].class === "nude"  || data.Prediction[0].class === "sexy") {
                    numDetections+=1;
                    chrome.storage.local.set({'detections': numDetections});
                    let fallbackImageUrl = "https://i.ibb.co/h2Fv4q0/Desktop-1.jpg";
                    images[index].src = fallbackImageUrl;
                    images[index].style.objectFit = 'contain'
                    images[index].style.objectPosition = '50%'
                    if (images[index].getAttribute('srcset')) {
                      images[index].setAttribute('srcset', fallbackImageUrl);
                    }
                    if (images[index].getAttribute('data-src')) {
                      images[index].setAttribute('data-src', fallbackImageUrl);
                    }
                  }
                  else{
                    images[index].src = imageUrl[index];
                    if (images[index].getAttribute('srcset')) {
                      images[index].setAttribute('srcset',  imageUrl[index]);
                    }
                    if (images[index].getAttribute('data-src')) {
                      images[index].setAttribute('data-src', imageUrl[index]);
                    }
                  }
                  chrome.runtime.sendMessage({msg: 'send'}, function(){
                    chrome.storage.local.set({ 'detections': numDetections});
                  });
                });
              }       
             
            })
          } 
        else{
          chrome.runtime.sendMessage({msg: 'imageClassify', index: i, url: imageSrc}, function({data,index}){
            console.log("URL["+numDetections+"]: " + imageUrl[index] + " Class: " + data.Prediction[0].class);
            let fallbackImageUrl = "https://i.ibb.co/h2Fv4q0/Desktop-1.jpg";
            if(sexyOption){
              if (data.Prediction[0].class === "nude" || data.Prediction[0].class === "sexy") {
                numDetections+=1;
                chrome.storage.local.set({'detections': numDetections});
               
                images[index].src = fallbackImageUrl;
                images[index].style.objectFit = 'contain'
                images[index].style.objectPosition = '50%'
                if (images[index].getAttribute('srcset')) {
                  images[index].setAttribute('srcset', fallbackImageUrl);
                }
                if (images[index].getAttribute('data-src')) {
                  images[index].setAttribute('data-src', fallbackImageUrl);
                }
              }
              else{
             
                  images[index].src = imageUrl[index];
                  if (images[index].getAttribute('srcset')) {
                    images[index].setAttribute('srcset',  imageUrl[index]);
                  }
                  if (images[index].getAttribute('data-src')) {
                    images[index].setAttribute('data-src', imageUrl[index]);
                  }
                
                
              }
            }
              else{
                if (data.Prediction[0].class === "nude") {
                  numDetections+=1;
                  chrome.storage.local.set({'detections': numDetections});
                  let fallbackImageUrl = "https://i.ibb.co/h2Fv4q0/Desktop-1.jpg";
                  images[index].src = fallbackImageUrl;
                  images[index].style.objectFit = 'contain'
                  images[index].style.objectPosition = '50%'
                  if (images[index].getAttribute('srcset')) {
                    images[index].setAttribute('srcset', fallbackImageUrl);
                  }
                  if (images[index].getAttribute('data-src')) {
                    images[index].setAttribute('data-src', fallbackImageUrl);
                  }
                }
                else{
                  images[index].src = imageUrl[index];
                  if (images[index].getAttribute('srcset')) {
                    images[index].setAttribute('srcset',  imageUrl[index]);
                  }
                  if (images[index].getAttribute('data-src')) {
                    images[index].setAttribute('data-src', imageUrl[index]);
                  }
                }
              }
              chrome.runtime.sendMessage({msg: 'send'}, function(){
                chrome.storage.local.set({ 'detections': numDetections});
                
              });
          });
        }
       
        
       
      }
    }
    setTimeout(getNewImages, 1000);
  } 
}


  
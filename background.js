chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({'haveCredentials':''});
  // Initialize variables here
  chrome.storage.local.set({ 'isActive': false});
  chrome.storage.local.set({ 'isSexyToggled': false, 'isCensorToggled': false});
  chrome.storage.local.set({ 'detections':0});
});

chrome.runtime.onMessage.addListener(function(request, sender, response) {
  
  if(request.msg === "imageClassify"){  
      var list = [{
        source: request.url
       }];
      fetch('http://ec2-18-136-200-224.ap-southeast-1.compute.amazonaws.com/classify-url/', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(list),
        })
        .then(response => response.text())
        .then(data => {
          let dataObj = JSON.parse(data);
          console.log(dataObj);
          response({data: dataObj, index: request.index});
        })
        .catch(error => console.log("error", error))
        return true;  // Will respond asynchronously.  
      }
    else if(request.msg === "imageCensor"){
      var list = [{
        source: request.url
       }];

       fetch('http://ec2-18-136-200-224.ap-southeast-1.compute.amazonaws.com/censor-url/', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(list),
        })
        .then(response => response.text())
        .then(dataCensor => {
          let dataObj = JSON.parse(dataCensor);
          console.log(dataObj);
          response({dataCensor: dataObj, indexCensor: request.indexCensor});
        })
        .catch(error => console.log("error", error))
        return true;  // Will respond asynchronously.  
      }
    
}); 



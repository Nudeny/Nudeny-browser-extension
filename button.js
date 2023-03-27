const button = document.getElementById('button');
const sexyToggle = document.getElementById('sexy-toggle');
const censorToggle = document.getElementById('censor-toggle');
const getNumdetections = document.getElementById('numDetections');
const eye = document.querySelector("#button i");
let isActive= false;

// Retrieve button state from local storage
chrome.storage.local.get('isActive', function (result) {
  console.log(result.isActive);
  isActive = result.isActive
  if (result.isActive === true) {
    
    //set element updates here
  }
  else{
    // Clear 
    chrome.storage.local.remove(["detections"]);
  }
});

chrome.storage.local.get('isSexyToggled', function (result) {
  console.log(result.isSexyToggled);
  sexyToggle.checked = result.isSexyToggled;
  if(sexyToggle.checked && censorToggle.checked){
    censorToggle.checked = false;
  }
});

chrome.storage.local.get('isCensorToggled', function (result) {
  console.log(result.isCensorToggled);
  censorToggle.checked = result.isCensorToggled;
  if(censorToggle.checked && sexyToggle.checked){
    sexyToggle.checked = false;
  }
});

// Button functionalities
document.addEventListener('DOMContentLoaded', function () {

  button.addEventListener('click', (event) => {
    let clickedButton;
    isActive = !isActive;
    if(isActive){
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.tabs.reload(tab.id, { bypassCache: true });
        });
      });
    }
    chrome.storage.local.set({ 'isActive': isActive });

    //Condition to check if user clicked the eye or the actual button
    if (event.target === eye) {
      clickedButton = event.target.parentNode;
    }
    else {
      clickedButton = event.target;
    }
    
    // Animation
    clickedButton.classList.toggle('click-button-animation');
    clickedButton.parentNode.classList.toggle('click-inner-animation');
    clickedButton.parentNode.parentNode.classList.toggle('click-outer-animation');

    // Color
    clickedButton.classList.toggle("button-enabled");
    clickedButton.parentNode.classList.toggle('button-enabled-inner');
    clickedButton.parentNode.parentNode.classList.toggle('button-enabled-outer');

    // Eye
    eye.classList.toggle("bi-eye-slash");
    eye.classList.toggle("bi-eye");
  
    //Body
    document.body.classList.toggle('disabled');

    setTimeout(() => {
      clickedButton.classList.toggle('click-animation');
      clickedButton.parentNode.classList.toggle('click-inner-animation');
      clickedButton.parentNode.parentNode.classList.toggle('click-outer-animation');
    }, 700);

  });

  sexyToggle.addEventListener('change', function(e) {
    if (this.checked) {
      if(censorToggle.checked) {
        censorToggle.checked = false;
      }
    } 
    chrome.storage.local.set({ 'isSexyToggled': this.checked, 'isCensorToggled': censorToggle.checked});
  });

  censorToggle.addEventListener('change', function(e) {
    if (this.checked) {
      if(sexyToggle.checked) {
        sexyToggle.checked = false;
      }
    } 
    chrome.storage.local.set({ 'isSexyToggled': sexyToggle.checked, 'isCensorToggled': this.checked});
  });

  chrome.runtime.onMessage.addListener(function(request, sender, response) {
    if(request.msg === "send") {
      chrome.storage.local.get("numDetections", () => {
        getNumdetections.innerText = numDetections.data;
      });
    }
  }); 

});

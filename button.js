const button = document.getElementById('button');
const sexyToggle = document.getElementById('sexy-toggle');
const censorToggle = document.getElementById('censor-toggle');
const getNumdetections = document.getElementById('numDetections');
const eye = document.querySelector("#button i");
const createAccount = document.getElementById("createLock");
const confirmAccount = document.getElementById("confirmLock");
const unlockBtn = document.getElementById("unlockLock");
const loginPage = document.getElementById("login");
const signupPage = document.getElementById("signup");
const mainContent = document.getElementById("mainContent");
const lockPassword = document.getElementById("lockPassword");
const passwordVal = document.getElementById("password")
const confirmpasswordVal = document.getElementById("confirmpassword")
const imageCounts = document.getElementById("imageCounts")
let isActive= false;

// Retrieve button state from local storage
chrome.storage.local.get('isActive', function (result) {
  isActive = result.isActive
  if (result.isActive === true) {
    button.classList.toggle('click-button-animation');
    button.parentNode.classList.toggle('click-inner-animation');
    button.parentNode.parentNode.classList.toggle('click-outer-animation');

    // Color
    button.classList.toggle("button-enabled");
    button.parentNode.classList.toggle('button-enabled-inner');
    button.parentNode.parentNode.classList.toggle('button-enabled-outer');

    // Eye
    eye.classList.toggle("bi-eye-slash");
    eye.classList.toggle("bi-eye");
  
    //Body
    mainContent.classList.toggle('disabled');

    chrome.storage.local.get('detections', function (result) {
      getNumdetections.innerText = result.detections
    });
  }
  
});

chrome.storage.local.get('isSexyToggled', function (result) {
  sexyToggle.checked = result.isSexyToggled;
  if(sexyToggle.checked && censorToggle.checked){
    censorToggle.checked = false;
    
  }
  if(sexyToggle.checked){
    imageCounts.innerText = "blocked images";
  }
  
});

chrome.storage.local.get('isCensorToggled', function (result) {
  censorToggle.checked = result.isCensorToggled;
  if(censorToggle.checked && sexyToggle.checked){
    sexyToggle.checked = false;
    
  }
  if(censorToggle.checked){
    imageCounts.innerText = "censored and blocked images";
  }
  
});


// Button functionalities
document.addEventListener('DOMContentLoaded', function () {

  createAccount.addEventListener('click', function(){
    signupPage.style.display = "flex";
    loginPage.style.display = "none"
  })


  confirmAccount.addEventListener('click', function(){ 
    if(passwordVal.value === confirmpasswordVal.value && (passwordVal.value !== '' || confirmpasswordVal.value !== '')){
      signupPage.style.display = "none";
      loginPage.style.display = "flex"
      createAccount.style.display = "none"
      chrome.storage.local.set({ 'haveCredentials':passwordVal.value});
      
    }
    else{
      console.log("Not Equal");
      passwordVal.value = ''
      confirmpasswordVal.value = ''
    }
  })

  unlockBtn.addEventListener('click', function(){
    chrome.storage.local.get('haveCredentials', function (result) {
      if(result.haveCredentials === lockPassword.value){
        confirmAccount.style.display = "none"
          loginPage.style.display = "none"
          mainContent.style.display = "block"
      }
      else{
        console.log(lockPassword.value)
        lockPassword.value = '';
      }
    });
  })
 
  chrome.storage.local.get('haveCredentials', function (result) {
    if(result.haveCredentials !== ''){
      createAccount.style.display = "none"
    }
    else{
      createAccount.style.display = "block"
    }
  });


  button.addEventListener('click', (event) => {
    let clickedButton;
    isActive = !isActive;
    if(isActive){
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.tabs.reload(tab.id, { bypassCache: true });
        });
      });
      chrome.storage.local.set({ 'detections':0});
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
    mainContent.classList.toggle('disabled');

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
      imageCounts.innerText = "blocked images";
    } 
    chrome.storage.local.set({ 'isSexyToggled': this.checked, 'isCensorToggled': censorToggle.checked});
    if(isActive){
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.tabs.reload(tab.id, { bypassCache: true });
        });
      });
      chrome.storage.local.set({ 'detections':0});
    }
   
  });

  censorToggle.addEventListener('change', function(e) {
    if (this.checked) {
      if(sexyToggle.checked) {
        sexyToggle.checked = false;
      }
      imageCounts.innerText = "censored and blocked images";;
    } 
    else{
      imageCounts.innerText = "blocked images";
    }
    chrome.storage.local.set({ 'isSexyToggled': sexyToggle.checked, 'isCensorToggled': this.checked});
    if(isActive){
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.tabs.reload(tab.id, { bypassCache: true });
        });
      });
      chrome.storage.local.set({ 'detections':0});
    }
   
  });

  chrome.runtime.onMessage.addListener(function(request) {
    if(request.msg === "send") {
        chrome.storage.local.get('detections', function (result) {
          getNumdetections.innerText = result.detections
        });
    }
    return true;
  }); 

 

});

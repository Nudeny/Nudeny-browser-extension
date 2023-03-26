const button = document.getElementById('button');
const sexyToggle = document.getElementById('sexy-toggle');
const censorToggle = document.getElementById('censor-toggle');
const getNumdetections = document.getElementById('numDetections');
const eye = document.querySelector("#button i");
let sexyIsChecked= false;
let censorIsChecked= false;

button.addEventListener('click', (event) => {
  let clickedButton;

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
  eye.classList.toggle("bi-eye");
  eye.classList.toggle("bi-eye-slash");

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
    if(censorIsChecked) {
      censorToggle.checked = false;
      censorIsChecked = false;
    }
    sexyIsChecked = true;
  } 
});

censorToggle.addEventListener('change', function(e) {
  if (this.checked) {
    if(sexyIsChecked) {
      sexyToggle.checked = false;
      sexyIsChecked = false;
    }
    censorIsChecked = true;
  } 
});

chrome.runtime.onMessage.addListener(function(request, sender, response) {
  if(request.msg === "send") {
    getNumdetections.innerText = request.data;
  }
}); 



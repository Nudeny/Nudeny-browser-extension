const button = document.getElementById('button');
const eye = document.querySelector("#button i");

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
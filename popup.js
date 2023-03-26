document.addEventListener('DOMContentLoaded', function() {
var isOn = false;
chrome.runtime.sendMessage({msg: "btnstatus", status: "off"});
    
const mainButton = document.getElementById("main");
const images = document.querySelectorAll("img");
mainButton.addEventListener("click", function() {
    chrome.tabs.reload();
    if(isOn) {
        mainButton.style.color = "red";
        isOn = false;
        chrome.runtime.sendMessage({msg: "btnstatus", status: "off"});
    }
    else{
        chrome.runtime.sendMessage({msg: "btnstatus", status: "on"});
        mainButton.style.color = "green";
        isOn = true;
    }
});
});

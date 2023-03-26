  var processedImages = [];
  var images = document.getElementsByTagName('img');


  function createFilename(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function getNewImages() {
    for (var i = 0; i < images.length; i++) {
      if (processedImages.indexOf(images[i]) === -1) {
        let url =  images[i].src;
        let firstString = url.split(':'); // Backlog: check if the image link is using base64 encoding
        let filename = createFilename(10);
        filename = filename.concat('.jpg');
        chrome.runtime.sendMessage({msg: "image"});
          // chrome.runtime.sendMessage({msg: 'image', index: i, filename:filename, url:images[i].src}, function({data,index}){
          //   // Backlog: Add image size checker condition
          //   console.log(data.predictions[0].class);
          //     if(data.predictions[0].class === "nude"){
          //       console.log("is nude");
          //       images[index].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"
          //     }
          // });
          processedImages.push(images[i]);
      }
    }
    setTimeout(getNewImages, 1000);
  }

  getNewImages();



  
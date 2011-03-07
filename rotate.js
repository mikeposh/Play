/*global $ */
$(document).ready(function () {

  function getBound(imageWidth, imageHeight) {
    return Math.ceil(Math.sqrt(imageHeight * imageHeight + imageWidth * imageWidth));
  }

  function rotateImage(context, n, bound, degRotate, image, width, height) {
    context.restore();
    context.save();
    context.translate(n * bound + (bound / 2), bound / 2);
    context.rotate(n * degRotate * Math.PI / 180);
    context.drawImage(image, -width / 2, -height / 2);
  }

  function createCanvas(container, width, height) {
    var canvas = $('<canvas />');
    canvas.attr({ 'width': width, 'height': height});
    canvas.attr('id', 'canvas_2');
    container.append(canvas);

    return canvas.get(0);
  }

  function drawRepeats(container, img, nFrames) {
    var canvas, context, degRotate, i, url,
      imageSrcUrl = img.src,
      width = img.width,
      height = img.height,
      originalImage = new Image(width, height),
      bound = getBound(width, height);

    degRotate = 360 / nFrames;
    originalImage.src = imageSrcUrl;
    canvas = createCanvas(container, nFrames * bound, bound);
    context = canvas.getContext("2d");

    for (i = 0; i < nFrames; i += 1) {
      rotateImage(context, i, bound, degRotate, originalImage, width, height);
    }

    url = canvas.toDataURL();

    return { bound: bound, canvas: canvas, url: url };
  }

  function main() {
    var img, newImg, result, rotatingImg,
      nFrames = 36, imageNum = 0, cycles = 2, intervalId, timeoutId;

    img = $('img.original');
    result = drawRepeats($('#container'), img.get(0), nFrames);

    $('#offset').html(result.bound);
    $('#url').val(result.url);
    newImg = $('<img/>').attr({'src': result.url});
    $('#container').append('<div/>').append(newImg);


    rotatingImg = $('<div/>').css({
      'background': '0 0 no-repeat url(' + result.url + ')',
      'border': 'solid blue 3px',
      'width': result.bound + 'px',
      'height': result.bound + 'px'
    });
//    rotatingImg = $('<div style="border:solid blue 3px;; width:' + img.width + ';height:' + img.height + '"/>');
    rotatingImg.appendTo($('#container'));

    intervalId = setInterval(function () {
      imageNum = ((imageNum - 1) % 36);
      rotatingImg.css('backgroundPosition', String(imageNum * result.bound) + 'px 0');

    }, 100);

    timeoutId = setTimeout(function () {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    }, 5000);

/*
    // 10 images, 0 to 90 degrees
    // 9 images 0 to 80
    // 9 images 90 to 170
    // 9 images 180 to 260
    // 9 images 270 to 350
    // total 36 images (0 to 35)
    var imageNum = 0;
    var elSpinnerText = document.getElementById('spinner-text');
    var elSpinner = document.getElementById('spinner');

    elSpinner.style.display = 'block';

    setInterval(function () {
      imageNum = ((imageNum - 1) % 36);
      var bgPosition = String(imageNum * 62) + 'px 0';

//      elSpinnerText.innerHTML = String((-1*imageNum) + 1);
      console.info(imageNum);
      console.info(bgPosition);
      elSpinner.style.backgroundPosition = bgPosition;

    }, 10);

*/









  }




  main();

});
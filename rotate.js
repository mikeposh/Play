/*global $ */
$(document).ready(function () {

  var img, result;

  function getBound(imageWidth, imageHeight) {
    return Math.ceil(Math.sqrt(imageHeight * imageHeight + imageWidth * imageWidth));
  }

  function rotateImage(context, n, bound, degRotate, image, width, height) {
//    context.restore();
//    context.save();
//    context.translate(n * bound + (bound / 2), bound / 2);
//    context.rotate(n * degRotate * Math.PI / 180);
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

//  img = $('<img src="image.png" width="60" height="60" />');
  img = $('<img src="solid.png" width="60" height="60" />');
  $('#container').append('<div/>').append(img);

  result = drawRepeats($('#container'), img.get(0), 1);
//  result = drawRepeats($('#container'), img.get(0), 36);

  $('#offset').html(result.bound);
  $('#url').val(result.url);
  var newImg = $('<img/>').attr({'src': result.url});
  $('#container').append('<div/>').append(newImg);

});
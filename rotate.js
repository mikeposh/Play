/*global $ */
$(document).ready(function () {

  function getBound(imageWidth, imageHeight) {
    return Math.sqrt(imageHeight * imageHeight + imageWidth * imageWidth);
  }

  function rotateImage(context, n, bound, degRotate, image, width, height) {
    context.restore();
    context.save();
    context.translate(n * bound + (bound / 2), bound / 2);
    context.rotate(n * degRotate * Math.PI / 180);
    context.drawImage(image, -width / 2, -height / 2);
  }

  function createCanvas(width, height) {
    var canvas = $('<canvas />');
    canvas.attr({ 'width': width, 'height': height});
    canvas.attr('id', 'canvas_2');
    $('#container').append(canvas);

    return canvas.get(0);
  }

  function drawRepeats(imageSrcUrl, width, height, nFrames) {
    var canvas, context, degRotate, i,
      originalImage = new Image(width, height),
      bound = getBound(width, height);

    degRotate = 360 / nFrames;
    originalImage.src = imageSrcUrl;

    canvas = createCanvas(nFrames * bound, bound);
    context = canvas.getContext("2d");

    for (i = 0; i < nFrames; i += 1) {
      rotateImage(context, i, bound, degRotate, originalImage, width, height);
    }

    return canvas;
  }

//  drawRepeats('solid.png', 60, 60, 4);
  drawRepeats('image.png', 60, 60, 36);

//  url = canvas.toDataUrl('image/png');


});
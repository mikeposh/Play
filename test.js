$(document).ready(function () {
  alert('hello');
  var canvas = $('#canvas_1');
  var context = canvas.getContext("2d");

  var originalImage = new Image(60, 60);
  originalImage.src = image.png;
  context.drawImage(originalImage, 0, 0);



});
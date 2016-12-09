/* global OT config */
// A real app would use require('opentok-filters/src/filters.js');
const filters = require('opentok-camera-filters/src/filters.js');

const captureButton = require('./components/captureButton');
const filterPicker = require('./components/filterPicker');

const canvas = document.createElement('canvas');

let videoElement;
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
}).then(stream => {
  videoElement = document.createElement('video');
  videoElement.srcObject = stream;
  videoElement.play();
  videoElement.addEventListener('loadedmetadata', () => {
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    let canvasStream = canvas.captureStream();

    filterPicker(videoElement, canvas, filters, document.body);
    if (stream.getAudioTracks().length) {
      canvasStream.addTrack(stream.getAudioTracks()[0]);
    }

    let filteredVideo = document.createElement('video');
    filteredVideo.srcObject = canvasStream;
    document.body.appendChild(filteredVideo);
    filteredVideo.play();

    captureButton(canvas, canvasStream, document.body);
  });
  document.body.appendChild(canvas);
});

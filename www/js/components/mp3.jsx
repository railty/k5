var audioCtx;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
var tones = {};

function dlMp3(fileName){
  var promise_resolve, promise_reject, p = new Promise(function (resolve, reject) { promise_resolve = resolve; promise_reject = reject; });

  var url;
  if (cordova.platformId == "browser"){
    url = cordova.file.applicationDirectory + "browser/" + "www/media/" + fileName;
  }
  else{
    url = cordova.file.applicationDirectory + "www/media/" + fileName;
  }

  var ajax = new XMLHttpRequest();
  ajax.open('GET', url, true);
  ajax.responseType = 'arraybuffer';
  ajax.onload = function() {
    console.log("download " + fileName + "success");
    promise_resolve(ajax.response);
  }

  ajax.send();
  return p;
}

function decodeMp3(audioData){
  var promise_resolve, promise_reject, p = new Promise(function (resolve, reject) { promise_resolve = resolve; promise_reject = reject; });

  var audioCtx = getAudioCtx();
  audioCtx.decodeAudioData(audioData, function(buffer) {
    promise_resolve(buffer);
  }, function(e){"Error with decoding audio data" + e.err});

  return p;
}

function playMp3(buffer){
  console.log("playing ");
  var audioCtx = getAudioCtx();
  var soundSource = audioCtx.createBufferSource();
  soundSource.buffer = buffer;
  soundSource.connect(audioCtx.destination);
  soundSource.start();
}

export function playTone(fileName){
  if (tones[fileName]){
    playMp3(tones[fileName]);
  }else{
    dlMp3(fileName).then(function(audioData){
      return decodeMp3(audioData);
    }).then(function(buffer){
      tones[fileName] = buffer;
      playMp3(tones[fileName]);
    });
  }
}

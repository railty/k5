import '../../css/graph.css'

import React, { PropTypes } from 'react'

class Graph extends React.Component {
    constructor(props) {
       super(props);
    }

    componentDidMount() {
      console.log("did mount");
      this.update();
    }

    componentDidUpdate() {
      console.log("update");
      this.update();
    }

    getUrl(filename){
      var url = "www/media/" + filename;
      if (cordova.platformId == "browser") url = "browser/" + url;
      url = cordova.file.applicationDirectory + url;
      return url;
    }

    dl(filename, callback){
      var ajaxRequest = new XMLHttpRequest();

      ajaxRequest.open('GET', this.getUrl(filename), true);
      ajaxRequest.responseType = 'arraybuffer';

      ajaxRequest.onload = function() {
        var audioData = ajaxRequest.response;
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtx.decodeAudioData(audioData, function(buffer) {
            callback(buffer);
          }, function(e){"Error with decoding audio data" + e.err}
        );
      }
      ajaxRequest.send();
    }

    update() {
      var draw = function(){
        var canvas = this.refs.canvas.getDOMNode();
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
//      ctx.fillRect(0, 10, 20, 30);
//      ctx.fillText(this.channel1.length, 10, 50);

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgb(0, 0, 0)';

        ctx.beginPath();
        var channel = this.channel0;
        var gate = 0.01;

        var iBegin = 0;
        while ((iBegin < channel.length) && (Math.abs(channel[iBegin]) < gate)) iBegin++;
        var iEnd = channel.length-1;
        while ((iEnd > 0) && (Math.abs(channel[iEnd]) < gate)) iEnd--;

        console.log(iEnd-iBegin);
        for (var i=iBegin; i<iEnd; i++){
          var x = (i-iBegin)*canvas.width/(iEnd - iBegin);
          var y = (0.5+channel[i])*canvas.height;
          if (i === iBegin) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height/2);
        ctx.stroke();

      }.bind(this);

      var clip = function(inbuf, gate){
        var iBegin = 0;
        while ((iBegin < inbuf.length) && (Math.abs(inbuf[iBegin]) < gate)) iBegin++;
        var iEnd = inbuf.length-1;
        while ((iEnd > 0) && (Math.abs(inbuf[iEnd]) < gate)) iEnd--;
        return inbuf.slice(iBegin, iEnd);
      };

      if (this.channel0) draw();
      else{
        this.dl("C3.mp3", function(buffer){
          this.channel0 = clip(buffer.getChannelData(0), 0.01);
          this.channel1 = clip(buffer.getChannelData(1), 0.01);
          console.log(this.channel0);
          draw();
        }.bind(this));
      }
    }

    render () {
      return (
        <div>
          <canvas className="visualizer" width="640" height="200" ref="canvas"></canvas>
        </div>
      )
    }
}

export default Graph;

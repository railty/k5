export function readFile(fileName) {
    var promise_resolve, promise_reject, p = new Promise(function (resolve, reject) { promise_resolve = resolve; promise_reject = reject; });

    window.resolveLocalFileSystemURL("cdvfile://localhost/persistent/", function(dir) {
      dir.getFile(fileName, {create: false}, function (datafile) {
        datafile.file(function (file) {
          var reader = new FileReader();
            reader.onloadend = function() {
              promise_resolve(JSON.parse(reader.result));
            };
            reader.onerror = function(e) {
              console.log("file reader error:");
              console.log(e);
            };
            reader.readAsText(file, 'UTF-8');
           });
        });
    });

    return p;
};

export function writeFile(fileName, data) {
    var promise_resolve, promise_reject, p = new Promise(function (resolve, reject) { promise_resolve = resolve; promise_reject = reject; });

    var str = JSON.stringify(data);
    var blob = new Blob([str], {type : 'text/plain'});

    window.webkitRequestFileSystem(window.PERSISTENT, 10*1024*1024, function (fs) {
      window.resolveLocalFileSystemURL("cdvfile://localhost/persistent/", function(dir) {
        dir.getFile("data.json", { create: true }, function (file) {
          file.createWriter(function(fileWriter) {

            fileWriter.onwriteend = function(e) {
              if (fileWriter.length === 0) {
                console.log("truncate");
                fileWriter.write(blob);
              }
              else{
                console.log("write completed");
                promise_resolve();
              }
            };

            fileWriter.onerror = function(e) {
              console.log('Write failed: ' + e.toString());
            };

            fileWriter.truncate(0);
          });
        });
      }, function(e){
        console.log("write file fail:");
        console.log(e);
      });
    });

    return p;
};

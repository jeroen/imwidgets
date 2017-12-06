HTMLWidgets.widget({

  name: 'cropper',
  type: 'output',

  factory: function(el, width, height) {
    //document.body.style.padding = '0';
    var round = Math.round;
    var img = document.createElement("img");
    var div = document.createElement("div");
    var p = document.createElement("p");
    p.style = "position: absolute; top: 0px; left:0; font-family: monospace; font-size: 18px; background-color: black; color:white; padding: 2px;";
    div.style = "height: 100%;";
    img.style = "height: 100%;";
    img.setAttribute('alt', 'preview');
    div.appendChild(img);
    div.appendChild(p);
    el.appendChild(div);

    var cropper = new Cropper(img, {
      background : true,
      modal: false,
      guides: false,
      highlight: false,
      viewMode : 1,
      autoCrop: false,
      movable: false,
      rotatable: false,
      scalable: false,
      zoomable : false,
      zoomOnWheel : false,
      zoomOnTouch : false,
      responsive: true,
      checkOrientation: false,
      toggleDragModeOnDblclick: false,
      crop: function(e) {
        var d = e.detail;
        if(d.width || d.height){
          p.innerHTML = "Area: " + round(d.width) + "x" + round(d.height) + "+" + round(d.x) + "+" + round(d.y);
        }
      },
      ready: function(e){
        cropper.setDragMode('crop');
      },
      cropstart: function(e){
        var ptr = e.detail.originalEvent;
        var d = cropper.getCanvasData();
        var x = (ptr.x - d.left) * (d.naturalWidth / d.width);
        var y = (ptr.y - d.top) * (d.naturalHeight / d.height);
        p.innerHTML = "Point: " + round(x) + "+" + round(y);
      }
    });

    return {
      renderValue: function(x) {
        cropper.replace(x.url);
      },

      resize: function(width, height) {
        //cropper.setCanvasData({width : width, height : height});
      }
    };
  }
});

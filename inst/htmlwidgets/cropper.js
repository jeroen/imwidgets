HTMLWidgets.widget({

  name: 'cropper',
  type: 'output',

  factory: function(el, width, height) {
    //document.body.style.padding = '0';
    var round = Math.round;
    function num(x) {
      x =  Math.round(x);
      return (x < 0 ? "" : "+") + x;
    }
    var img = document.createElement("img");
    var div = document.createElement("div");
    var p = document.createElement("p");
    p.className = "geometry_label_box";
    div.className = "cropper_image_wrapper";
    img.className = "cropper_image_element";
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
      ready: function(e){
        cropper.setDragMode('crop');
      },
      crop: function(e) {
        var d = e.detail;
        if(d.width || d.height){
          p.innerHTML = "Area: " + round(d.width) + "x" + round(d.height) + num(d.x) + num(d.y);
        }
      },
      // This is not entirely correct but close
      cropstart: function(e){
        if(e.detail.action ===  'crop')
          cropper.clear();
        var ptr = e.detail.originalEvent;
        var d = cropper.getCanvasData();
        var x = (ptr.layerX - d.left) * (d.naturalWidth / d.width);
        var y = (ptr.layerY - d.top) * (d.naturalHeight / d.height);
        p.innerHTML = "Point: " + num(x) + num(y);
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

HTMLWidgets.widget({

  name: 'cropper',
  type: 'output',

  factory: function(el, width, height) {
    //document.body.style.padding = '0';
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

    window.cropper = new Cropper(img, {
      //aspectRatio: 16 / 9,
      background : true,
      //dragMode : 'none',
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
      crop: function(e) {
        var d = e.detail;
        var round = Math.round;
        if(d.width || d.height){
          p.innerHTML = "area: " + round(d.width) + "x" + round(d.height) + "+" + round(d.x) + "+" + round(d.y);
        } else {
          p.innerHTML = "";
        }
      },
      hover: function(e){
        alert("hover");
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

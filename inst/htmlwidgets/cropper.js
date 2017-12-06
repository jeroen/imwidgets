HTMLWidgets.widget({

  name: 'cropper',
  type: 'output',

  factory: function(el, width, height) {
    //document.body.style.padding = '0';
    var img = document.createElement("img");
    var div = document.createElement("div");
    div.style = "height: 100%;";
    img.setAttribute('alt', 'preview');
    div.appendChild(img);
    el.appendChild(div);

    var cropper = new Cropper(img, {
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
      crop: function(e) {

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

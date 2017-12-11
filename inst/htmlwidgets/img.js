//Position: https://www.w3schools.com/howto/howto_css_image_text.asp
HTMLWidgets.widget({

  name: 'img',
  type: 'output',

  factory: function(el, width, height) {

    function copyclipboard(){
      textbox.select();
      document.execCommand("Copy");
    }

    function offset(el) {
      var rect = el.getBoundingClientRect();
      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    function num(x) {
      x = Math.round(x);
      return (x < 0 ? "" : "+") + x;
    }

    function xw(){
      return img.naturalWidth / img.width;
    }

    function xh(){
      return img.naturalHeight / img.height;
    }

    function point(e){
      var off = offset(container);
      return {x : e.pageX - off.left, y : e.pageY - off.top};
    }

    function getrange(e){
      var endpoint = point(e);
      var x1 = Math.min(startpoint.x, endpoint.x);
      var y1 = Math.min(startpoint.y, endpoint.y);
      var width = Math.abs(startpoint.x - endpoint.x);
      var height = Math.abs(startpoint.y - endpoint.y);
      return {w : width, h :height, x : x1, y : y1 };
    }

    function moveshape(range){
      if(!range || !range.w || !range.h){
        shape.style.display = "none";
      } else {
        shape.style.display = "";
        shape.style.left = range.x + "px";
        shape.style.top = range.y + "px";
        shape.style.width = range.w + 1 + "px";
        shape.style.height = range.h + 1 + "px";
      }
    }

    var container = document.createElement("div");
    container.setAttribute('class', 'basic-container');
    var textbox = document.createElement("input");
    textbox.setAttribute('type', 'text');
    textbox.setAttribute('size', '15');
    textbox.setAttribute('class', 'basic-textbox');
    var shape = document.createElement("div");
    shape.setAttribute('class', 'basic-shape');
    var img = document.createElement("img");
    img.setAttribute('class', 'basic-img checkered');
    img.setAttribute("alt", "preview");

    var startpoint;
    var exitpoint;
    container.addEventListener("mousedown", function(e) {
      e.preventDefault();
      exitpoint = null;
      startpoint = point(e);
    });
    container.addEventListener("mouseup", function(e) {
      e.preventDefault();
      copyclipboard();
      exitpoint = point(e);
    });
    img.addEventListener("click", function(e) {
      e.preventDefault();
      startpoint = exitpoint = null;
      moveshape();
      copyclipboard();
    });
    textbox.addEventListener("mousemove", function(e){
      e.stopPropagation();
    });

    container.addEventListener("mousemove", function(e) {
      e.preventDefault();
      if(exitpoint) return;
      if(startpoint){
        var box = getrange(e);
        moveshape(box);
        textbox.value = Math.round(box.w * xw()) + "x" + Math.round(box.h * xh()) +
          num((box.x - img.offsetLeft) * xw()) + num((box.y - img.offsetTop) * xh());
      } else {
        var pt = point(e);
        textbox.value = num((pt.x - img.offsetLeft) * xw()) + num((pt.y - img.offsetTop) * xh());
      }
    });

    container.appendChild(img);
    container.appendChild(shape);
    container.appendChild(textbox);
    el.appendChild(container);

    return {

      renderValue: function(x) {
        img.setAttribute("src", x.url);
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});

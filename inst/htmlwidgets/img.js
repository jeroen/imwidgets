//Position: https://www.w3schools.com/howto/howto_css_image_text.asp
HTMLWidgets.widget({

  name: 'img',

  type: 'output',

  factory: function(el, width, height) {

    var round = Math.round;
    function num(x) {
      x = Math.round(x);
      return (x < 0 ? "" : "+") + x;
    }

    var container = document.createElement("div");
    container.setAttribute('class', 'basic-container');
    var textbox = document.createElement("div");
    textbox.setAttribute('class', 'basic-textbox');
    var img = document.createElement("img");
    img.setAttribute('class', 'basic-img checkered');
    img.setAttribute("alt", "preview");
    img.addEventListener("mousemove", function(e) {
      var xw = img.naturalWidth / img.width;
      var xh = img.naturalHeight / img.height ;
      textbox.innerHTML = num(e.offsetX * xw) + num(e.offsetY * xh);
    });
    container.appendChild(img);
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

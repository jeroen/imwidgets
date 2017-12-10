HTMLWidgets.widget({

  name: 'img',

  type: 'output',

  factory: function(el, width, height) {

    var img = document.createElement("img");
    img.setAttribute("alt", "preview");
    el.appendChild(img);

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

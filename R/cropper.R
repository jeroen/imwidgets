#' Cropper Widget
#'
#' Wrapper for [cropper.js](https://github.com/fengyuanchen/cropperjs). Shows
#' image and lets user select a subarea within the image.
#'
#' @import htmlwidgets
#' @export
#' @param url path or url to an image
#' @param width widget width in pixels
#' @param height widget height in pixels
#' @param elementId see [htmlwidgets::createWidget]
cropper <- function(url, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  params = list(
    url = url
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'cropper',
    x = params,
    width = width,
    height = height,
    sizingPolicy = htmlwidgets::sizingPolicy(
      padding = 0,
      browser.fill = TRUE,
      viewer.fill = TRUE
    ),
    package = 'imwidgets',
    elementId = elementId
  )
}

#' Shiny bindings for cropper
#'
#' Output and render functions for using cropper within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a cropper
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name cropper-shiny
#'
#' @export
cropperOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'cropper', width, height, package = 'imwidgets')
}

#' @rdname cropper-shiny
#' @export
renderCropper <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, cropperOutput, env, quoted = TRUE)
}

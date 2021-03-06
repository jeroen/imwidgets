#' Plain Image
#'
#' HTML widgets that creates simple `<img>` html tag.
#'
#' @import htmlwidgets
#' @inheritParams cropper
#' @export
img <- function(url, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  params = list(
    url = url
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'img',
    x = params,
    width = width,
    height = height,
    sizingPolicy = htmlwidgets::sizingPolicy(
      padding = 0,
      browser.fill = TRUE,
      viewer.fill = TRUE,
      knitr.figure = FALSE,
      knitr.defaultWidth = '100%',
      knitr.defaultHeight = 'auto'
    ),
    package = 'imwidgets',
    elementId = elementId
  )
}

#' Shiny bindings for img
#'
#' Output and render functions for using img within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a img
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name img-shiny
#'
#' @export
imgOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'img', width, height, package = 'imwidgets')
}

#' @rdname img-shiny
#' @export
renderImg <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, imgOutput, env, quoted = TRUE)
}

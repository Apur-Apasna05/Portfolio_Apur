/** Force window scroll to top (GitHub Pages / mobile quirks). */
export function scrollWindowToTop() {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

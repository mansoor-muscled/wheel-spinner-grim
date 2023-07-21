function reloadCss() {
  let styles = document.getElementsByTagName("style");

  for (let i = 0; i < styles.length; i++) {
    if (styles[i].innerHTML.substring(0, 7) == ".reaper") {
      styles[i].innerHTML.concat(" ");
      styles[i].innerHTML.slice(0, -1);
    }
  }
}

export default reloadCss;

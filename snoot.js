/*
    Exercise 01_06_01

      Form validation code for snoot.html
      Author: Vincent Sanchez
      Date:   8.6.18

      Filename: snoot.js
*/
"use strict";

// function to remove select list defaults
function removeSelectDefaults() {
  var emptyBoxes = document.getElementsByTagName("select");
  alert("select lists: " + emptyBoxes.length);
}

//page load event handlers
if (window.addEventListener) {
  window.addEventListener("load", removeSelectDefaults, false);
}else if (window.attachEvent) {
  window.attachEvent("onload", removeSelectDefaults, false);
}

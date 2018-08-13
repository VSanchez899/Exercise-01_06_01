/*
    Exercise 01_06_01

      Form validation code for snoot.html
      Author: Vincent Sanchez
      Date:   8.6.18

      Filename: snoot.js
*/
"use strict";

var twentyNine = document.createDocumentFragment();
var thirthy = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();
var formValidity = true;

// function to remove select list defaults
function removeSelectDefaults() {
  var emptyBoxes = document.getElementsByTagName("select");
  for (var i = 0; i < emptyBoxes.length; i++) {
    emptyBoxes[i].selectedIndex = -1;
  }
}

//functiuon to set up document fragments for days of the month
function setUpDays () {
  var dates = document.getElementById("delivDy").getElementsByTagName("option");
  twentyNine.appendChild(dates[28].cloneNode(true));
  thirthy.appendChild(dates[28].cloneNode(true));
  thirthy.appendChild(dates[29].cloneNode(true));
  thirtyOne.appendChild(dates[28].cloneNode(true));
  thirtyOne.appendChild(dates[29].cloneNode(true));
  thirtyOne.appendChild(dates[30].cloneNode(true));
}

// function to setup list of days based on the selected month
function updateDays() {
  var deliveryDay = document.getElementById("delivDy");
  var dates = deliveryDay.getElementsByTagName("option");
  var deliveryMonth = document.getElementById("delivMo");
  var deliveryYear = document.getElementById("delivYr");
  var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value
  while (dates[28]) {
    deliveryDay.removeChild(dates[28]);
  }
  if (deliveryYear.selectedIndex === -1) {
    deliveryDay.selectedIndex = 0;
  }
  // if feb and 2020 twentyNine
  if (selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2020"){
    deliveryDay.appendChild(twentyNine.cloneNode(true));
  //else if 30 day month thirty
  }else if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9" || selectedMonth === "11"){
    deliveryDay.appendChild(thirthy.cloneNode(true));
  //else if 31 day month thirtyOne
  }else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7" || selectedMonth === "8" || selectedMonth === "10" || selectedMonth === "12"){
    deliveryDay.appendChild(thirtyOne.cloneNode(true));
  }

}

//function to inspect custom check box on message change
function autoCheckCustom() {
  var messageBox = document.getElementById("customText");
  //textarea has a message, Check the box
  if (messageBox.value !== "" && messageBox.value !== messageBox.placeholer) {
    document.getElementById("custom").checked = "checked";
    //textarea has no message, Uncheck the box
  }else{
    document.getElementById("custom").checked = "";
  }
}

//function to copy billing to delivery address
function copyBillingAddress() {
  var billingInputElements = document.querySelectorAll("#billingAddress input");
  var deliveryInputElements = document.querySelectorAll("#deliveryAddress input");
  //duplicate address - checkbox is checked - copy
  if (document.getElementById("sameAddr").checked) {
    for (var i = 0; i < billingInputElements.length; i++) {
      deliveryInputElements[i + 1].value = billingInputElements[i].value;
      
    }
    document.querySelector("#deliveryAddress select").value = document.querySelector("#billingAddress select").value;
  }
  //duplicate address - checkbox not checked - erased
   else {
    for (var i = 0; i < billingInputElements.length; i++) {
      deliveryInputElements[i + 1].value = "";
      
    }
    document.querySelector("#deliveryAddress select").selectedIndex = -1;
  }
}

//function to validate address - billing and delivery
function validateAddress (fieldsetId) {
  var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
  var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
  var fieldsetValidity = true;
  var elementCount = inputElements.length;
  var currentElement;
  try {
    //loop through input fields looking for blanks
    for (var i = 0; i < elementCount; i++) {
      currentElement = inputElements[i];
      //blanks
      //not blanks
      if (currentElement.value === "") {
        currentElement.style.background = "rgb(255,233,233)";
        fieldsetValidity = false;
      }
      //not blanks
      else{
        currentElement.style.background = "white";
      }
    }
    //validate select list field
    currentElement = document.querySelectorAll("#" + fieldsetId + " select")[0];
    if (currentElement.selectedIndex === -1){
      currentElement.style.border = "1px solid red";
      fieldsetValidity = false;
    }
    else{
      currentElement.style.border = "";
    }
    //action for invalid fieldset
    if (fieldsetValidity === false) {
      if (fieldsetValidity === "billingAddress") {
        throw "Please complete all billing address information"
      }
      else{
        throw "Please complete all delivery address information"
      }
    }
    else{
      errorDiv.style.display = "none";
      errorDiv.innerHTML = "";
    }
  } catch (msg) {
    errorDiv.style.display = "block";
    errorDiv.innerHTML = msg;
    formValidity = false;
  }
}
//function to validate entire formValidity
function validateForm(evt) {
  //prevent from default behavior
  if (evt.preventDefault) {
    evt.preventDefault();
  }else{
    evt.returnValue = false;
  }
  formValidity = true;

  validateAddress("billingAddress");
  validateAddress("deliveryAddress");

  

  if (formValidity === true) { // form is valid
    document.getElementById("errorText").innerHTML = "";
    document.getElementById("errorText").style.display = "none";
    document.getElementsByTagName("form")[0].submit();

  }else{
    document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order.";
    document.getElementById("errorText").style.display = "block";
    scroll(0,0);
  }
}

//function that set up page on load event
function setUpPage(){
  removeSelectDefaults();
  setUpDays();
  createEventListeners();
}

//function to create event listener
function createEventListeners(){
  var deliveryMonth = document.getElementById("delivMo")
  if (deliveryMonth.addEventListener) {
    deliveryMonth.addEventListener("change", updateDays, false);
    //this is if it is Internet Explorer
  }else if (window.attachEvent) {
    deliveryMonth.attachEvent("onchange", updateDays, false);
  }

  var deliveryYear = document.getElementById("delivYr");
  if (deliveryYear.addEventListener) {
    deliveryYear.addEventListener("change", updateDays, false);
  }else if (window.attachEvent) {
    deliveryYear.attachEvent("onchange", updateDays, false);
  }

  var messageBox = document.getElementById("customText");
  if (messageBox.addEventListener) {
    messageBox.addEventListener("change", autoCheckCustom, false);
  }else if (window.attachEvent) {
    messageBox.attachEvent("onchange", autoCheckCustom, false);
  }

  var same = document.getElementById("sameAddr");
  if (same.addEventListener) {
    same.addEventListener("change", copyBillingAddress, false);
  }else if (same.attachEvent) {
    same.attachEvent("onchange", copyBillingAddress, false);
  }

  var form = document.getElementsByTagName("form")[0];
  if (same.addEventListener) {
    form.addEventListener("submit", validateForm, false);
  }else if (same.attachEvent) {
    form.attachEvent("onsubmit", validateForm, false);
  }
}
//page load event handlers
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false);
}else if (window.attachEvent) {
  window.attachEvent("onload", setUpPage, false);
}

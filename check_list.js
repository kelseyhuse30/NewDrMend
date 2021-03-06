var conditions_request = new XMLHttpRequest();
conditions_request.open('GET', 'https://api.infermedica.com/v2/symptoms', true);
conditions_request.setRequestHeader("App-Id","00ed7389")
conditions_request.setRequestHeader("App-Key","7f3e634c66e7f5a734a549f7cc4e4683")
conditions_request.setRequestHeader("Content-Type","application/json")
// Send request
conditions_request.send();
conditions_request.addEventListener("load", transferComplete);

var data = [];

function transferComplete() {
  data = JSON.parse(conditions_request.responseText);

  populateConditions(data);
}

function populateConditions(data) {
  var conditions_list = document.getElementById('myInput');
  var y = document.getElementById('myForm');

  //create an html element for each condition
  data.forEach(function(symptom) {
    console.log(symptom);
    var div = document.createElement("DIV");
    div.className = "form-check";
    div.setAttribute("id", symptom.name);
    var input = document.createElement("INPUT");
    input.className = "form-check-input";
    input.setAttribute("name", symptom.name);
    input.setAttribute("type", "checkbox");
    input.setAttribute("value", symptom.id);
    var label = document.createElement("LABEL");
    label.className = "form-check-label";
    label.setAttribute("for", symptom.name);
    label.innerHTML = symptom.name;
    div.appendChild(input);
    div.appendChild(label);
    y.appendChild(div);
  });

  var button = document.createElement("BUTTON");
  button.className = "btn btn-primary mb-2";
  button.setAttribute("type", "submit");
  button.innerHTML = "Submit for Diagnosis";
  y.appendChild(button);
}

function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    form = document.getElementById("myForm");
    divs = form.getElementsByTagName("div");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < divs.length; i++) {
        if (divs[i].id.toUpperCase().indexOf(filter) > -1) {
            divs[i].style.display = "";
        } else {
            divs[i].style.display = "none";
        }
    }
}

document.getElementById("myForm").addEventListener("submit", function(e){
    e.preventDefault();
    var formData = $('form').serializeJSON();
    console.log(formData);
});

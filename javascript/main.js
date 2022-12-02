// ----------------------------------------
// Declarations
// ----------------------------------------

const url = 'https://frontend-take-home.fetchrewards.com/form';
const stateSelect = document.getElementById('user_state');
const occupationSelect = document.getElementById('user_occupation');
const form = document.querySelector('#createUser');

var fullName = "";
var email = "";
var password = "";
var selectedOccupation = "";
var selectedState = "";

var xhrGet = new XMLHttpRequest();  // new HttpRequest instance 
var xhrPost = new XMLHttpRequest();  // new HttpRequest instance 



// ----------------------------------------
// Get dropdown data
// ----------------------------------------

// open request
xhrGet.open('GET', url, true);  
xhrGet.responseType = 'text';


xhrGet.onreadystatechange = function () {

    if (xhrGet.readyState == 1) {
        console.log('State = Request started');
        console.log('Status = ' + xhrGet.status);
    }
    if (xhrGet.readyState == 2) {
        console.log('State = Headers received');
        console.log('Status = ' + xhrGet.status);
    }
    if (xhrGet.readyState == 3) {
        console.log('State = Data loading .. !');
        console.log('Status = ' + xhrGet.status);
    }
    if (xhrGet.readyState == 4) {
        console.log('State = Request completed');
        console.log('Status = ' + xhrGet.status);
    }
}

xhrGet.onload = function() {

    if (xhrGet.status === 200) {
        var data = JSON.parse(xhrGet.responseText);
    //    console.log(data);
      
        var stOptions = "";
        var stList = "";
        var occOptions = "";
        var occList = "";

        for (i = 0; i < data.occupations.length; i++) {
            // console.log(data.occupations[i]);
            occOptions = document.createElement('option');
            occOptions.setAttribute("value", "occupationsList");
            occList = document.createTextNode(data.occupations[i]);
            occOptions.appendChild(occList);
            occupationSelect.appendChild(occOptions);
        }
        for (i = 0; i < data.states.length; i++) {
          //  console.log(data.states[i].abbreviation + " - " + data.states[i].name);
            stOptions = document.createElement('option');
            stOptions.setAttribute("value", "statesList");
            stList = document.createTextNode(data.states[i].abbreviation + " - " + data.states[i].name);
            stOptions.appendChild(stList);
            stateSelect.appendChild(stOptions);
        }
    }
}
// send request
xhrGet.send(); 


// ----------------------------------------
// Submit form
// ----------------------------------------

$("form").on('submit', function (e) {

        xhrPost.onload = function() {

            if (xhrPost.status === 201) {

                var response = JSON.parse(xhrPost.responseText);
                console.log(response);
                console.log("User created successfully !!");
                alert("User created successfully !!");
            //    document.getElementById('success').innerHTML = "User account created succesfully!!"
                form.reset();
            }
        }
        
        // get set values
        fullName = document.getElementById('user_fullname').value;
        email = document.getElementById('user_email').value;
        password = document.getElementById('user_password').value;
        selectedOccupation = occupationSelect.options[occupationSelect.selectedIndex].text;
        selectedState = stateSelect.options[stateSelect.selectedIndex].text;

        // create a JSON object with set values
        const dataValues = {

            "name": fullName,
            "email": email,
            "password": password,
            "occupation": selectedOccupation,
            "state": selectedState
        };
        //console.log(dataValues);

        // open request
        xhrPost.open('POST', url, true);  
        
        // set 'Content-Type' header
        xhrPost.setRequestHeader('Content-Type', 'application/json');
        xhrPost.setRequestHeader('Accept', 'application/json');

        xhrPost.onreadystatechange = function() { 

            if (xhrPost.readyState == 1) {
                console.log('State = Request started');
                console.log('Status = ' + xhrPost.status);
            }
            if (xhrPost.readyState == 2) {
                console.log('State = Headers received');
                console.log('Status = ' + xhrPost.status);
            }
            if (xhrPost.readyState == 3) {
                console.log('State = Data sending .. !');
                console.log('Status = ' + xhrPost.status);
            }
            if (xhrPost.readyState == 4) {
                console.log('State = Request completed');
                console.log('Status = ' + xhrPost.status);
            }
            console.log(xhrPost.responseText);
        };

        // send request with JSON payload
        xhrPost.send(JSON.stringify(dataValues));

    // stop form submission
    e.preventDefault();
});



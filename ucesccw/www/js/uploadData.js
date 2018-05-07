//Code adapted from: https://github.com/claireellul/cegeg077-week6formcode

// Function to ensure all form fields are filled in 
// This function is not consistent 
function validateQuestion() {
	var ln=document.getElementById("location_name").value;
	var q=document.getElementById("question").value;
	var a1=document.getElementById("answer_1").value;
	var a2=document.getElementById("answer_2").value;
	var a3=document.getElementById("answer_3").value;
	var a4=document.getElementById("answer_4").value;

	
	if (ln==null || ln=="",q==null || q=="",a1==null || a1=="",a2==null || a2=="",a3==null || a3=="",a4==null || a4=="")
        {
            alert("Please ensure all fields are filled.");
            return false;
        }
        else
        {
        	uploadQuestion()
        }
}

// Submit form values to the database 
function uploadQuestion() {
	alert ("Submitting question to database!");
	// Retrieve values from form
	var location_name = document.getElementById("location_name").value;
	var question = document.getElementById("question").value;

	var answer_1 = document.getElementById("answer_1").value;
	var answer_2 = document.getElementById("answer_2").value;
	var answer_3 = document.getElementById("answer_3").value;
	var answer_4 = document.getElementById("answer_4").value;

	var lat = document.getElementById("lat").value;
	var lng = document.getElementById("lng").value;

	// Assigns the form values to the variable
	var postString = "location_name="+location_name +"&question="+question +"&answer_1="+answer_1 +"&answer_2="+answer_2 +"&answer_3="+answer_3+ "&answer_4="+answer_4;

	// Get the correct answer value from the radio buttons
	if (document.getElementById("check1").checked) {
        postString=postString+"&answer_correct=1";
    }
    if (document.getElementById("check2").checked) {
    	postString=postString+"&answer_correct=2";
    }
	if (document.getElementById("check3").checked) {
		postString=postString+"&answer_correct=3";
	}
	if (document.getElementById("check4").checked) {
		postString=postString+"&answer_correct=4";
	}
	// Add the coordinate values to the form values
	postString = postString + "&lat=" + lat + "&lng=" + lng;

	//
	processQuestion(postString);
}

// holds the XMLHttpRequest()
var client;

// Uploads question data in postString variable to the database using XMLHttpRequest() and 'POST' functionality
function processQuestion(postString) {
   client = new XMLHttpRequest();
   client.open('POST','http://developer.cege.ucl.ac.uk:30289/uploadData',true);
   client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   client.onreadystatechange = questionUploaded;  
   client.send(postString);
}

// Create the code to wait for the response from the data server, and process the response once it is received
function questionUploaded() {
  // Wait for the data to be ready - i.e. has state 4
  if (client.readyState == 4) {
    // Change the DIV to show the response
    document.getElementById("questionUploadResult").innerHTML = client.responseText;
    }
}
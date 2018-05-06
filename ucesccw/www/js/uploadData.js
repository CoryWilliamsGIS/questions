//Code adapted from: https://github.com/claireellul/cegeg077-week6formcode

//Function to ensure all form fields are filled in 
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
        	startDataUpload()
        }
}

function startDataUpload() {
	alert ("Submitting question to database!");

	var location_name = document.getElementById("location_name").value;
	var question = document.getElementById("question").value;

	var answer_1 = document.getElementById("answer_1").value;
	var answer_2 = document.getElementById("answer_2").value;
	var answer_3 = document.getElementById("answer_3").value;
	var answer_4 = document.getElementById("answer_4").value;

	var lat = document.getElementById("lat").value;
	var lng = document.getElementById("lng").value;


	var postString = "location_name="+location_name +"&question="+question +"&answer_1="+answer_1 +"&answer_2="+answer_2 +"&answer_3="+answer_3+ "&answer_4="+answer_4;

	// now get the radio button values - ensure one is checked
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

	postString = postString + "&lat=" + lat + "&lng=" + lng;


	processData(postString);
}

var client;

function processData(postString) {
   client = new XMLHttpRequest();
   client.open('POST','http://developer.cege.ucl.ac.uk:30289/uploadData',true);
   client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   client.onreadystatechange = dataUploaded;  
   client.send(postString);
}

// Create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
  // Wait for the data to be ready - i.e. has state 4
  if (client.readyState == 4) {
    // Change the DIV to show the response
    document.getElementById("dataUploadResult").innerHTML = client.responseText;
    }
}
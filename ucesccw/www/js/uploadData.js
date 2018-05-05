function validateData() {
        var a=document.getElementById("location_name").value;
        var b=document.getElementById("question").value;
        var c=document.getElementById("answer_1").value;
        var d=document.getElementById("answer_2").value;
        var e=document.getElementById("answer_3").value;
        var f=document.getElementById("answer_4").value;
        var g=document.getElementById("answer_1").value;
        var h=document.getElementById("answer_2").value;    

        if (a==null || a=="",b==null || b=="",c==null || c=="",d==null || d=="")
        {
            alert("Please fill in all fields.");
            return false;
        }
        else
        {
        	startDataUpload()
        }
}

function startDataUpload() {
	alert ("start data upload");

	var location_name = document.getElementById("location_name").value;
	var question = document.getElementById("question").value;

	var answer_1 = document.getElementById("answer_1").value;
	var answer_2 = document.getElementById("answer_2").value;
	var answer_3 = document.getElementById("answer_3").value;
	var answer_4 = document.getElementById("answer_4").value;

	var lat = document.getElementById("lat").value;
	var lng = document.getElementById("lng").value;

	alert(location_name + " "+ question + " \n"+ answer_1 + " " + answer_2 + " " + answer_3 + " " + answer_4 + " \n" + lat + " " + lng);

	var postString = "location_name="+location_name +"&question="+question +"&answer_1="+answer_1 +"&answer_2="+answer_2 +"&answer_3="+answer_3+ "&answer_4="+answer_4;

	// now get the radio button values
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

	alert (postString);

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

// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
  // this function listens out for the server to say that the data is ready - i.e. has state 4
  if (client.readyState == 4) {
    // change the DIV to show the response
    document.getElementById("dataUploadResult").innerHTML = client.responseText;
    }
}

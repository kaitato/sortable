    var data = [];
     
    function saveData(){
    	var firstname = document.getElementById("firstname");
    	var lastname = document.getElementById("lastname");
    	var address = document.getElementById("address");
     
    	if(firstname.value == "" || lastname.value == "" || address.value == ""){
    		alert("Please complete the required field first!");
    	}else{
    		var member = {
    			'firstname': firstname.value,
    			'lastname': lastname.value,
    			'address': address.value,
    		};
     
    		data.push(member);
    		displayData(data.length);
    		firstname.value = "";
    		lastname.value = "";
    		address.value = "";
     
    	}
    }
     
     
    function changeRow(){
    	var row=document.getElementById('row').value;
     
    	if(row=="" || row<=0){
    		alert("Please enter a valid number");
    	}else{
    		if(data.length == 0){
    			alert("No data found!");
    		}else{
    			displayData(parseInt(row));
    		}
     
    	}
    }
     
     
    function displayData(length){
    	var table = "" ;
     
    	for(var i=0; i<length; i++){
    		table += "<tr>";
    		table += "<td>" 
    				+ data[i].firstname +"</td>" 
    				+ "<td>" + data[i].lastname +"</td>" 
    				+ "<td>" + data[i].address +"</td>" ;
    		table += "</tr>";
    	}
     
    	document.getElementById("result").innerHTML = table;
     
    }


function calculate_calories() {
                var duration=parseInt(localStorage.getItem("duration"));
                var weight = parseInt(document.getElementById("Text").value);
                var result = weight*duration*0.175;

                return Math.round(result);
            }
function myFunction() {
	if(isNaN(calculate_calories())){
		alert("Oops! Enter a valid weight value please!");
		
	}
	else{
		alert("Congratulations! You burned " + calculate_calories() + " cal :) !");
}
}

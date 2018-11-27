function calculate_calories() {
                var duration=parseInt(localStorage.getItem("duration"));
                var weight = parseInt(document.getElementById("Text").value);
                var result = weight*duration*0.175;

                return result;
            }
function myFunction() {
		alert("Congratulations! You burned " + calculate_calories() + " cal :) !");
}

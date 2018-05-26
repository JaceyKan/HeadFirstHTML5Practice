/*function Movie(title, type, rate, times){
	this.title = title;
	this.type = type;
	this.rate = rate;
	this.times = times;
}

var paln9Movie = new Movie("Plan 9 from Outer Space", 
	"Cult Classic", 2, ["3:00pm", "7:00pm", "11:00pm"]);

var jsonString = JSON.stringify(paln9Movie);
alert(jsonString);

var jsonMovieObject = JSON.parse(jsonString);
alert("JSON Movie is " + jsonMovieObject.title);*/

window.onload = function() {
	var url = "sales.json";
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = function() {
		if(request.state == 200) {
			updateSales(request.responseText);
		}
	};

	request.send(null);

	function updateSales(responseText) {
		var salesDiv = document.getElementById("sales");
		salesDiv.innerHTML = responseText;
	}
}
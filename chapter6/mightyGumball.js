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
/*	var url = "http://gumball.wickedlysmart.com";
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = function() {
		if(request.status == 200) {
			updateSales(request.responseText);
		} 
		console.log(request);
	};

	request.send(null);*/
	//addScript();
	setInterval(addScript, 3000);
}

var lastReportTime = 0;

function addScript() {
	var url="http://gumball.wickedlysmart.com?callback=updateSales" + 
			"&random=" + (new Date()).getTime() + 
			 "&lastreporttime="+lastReportTime;
	var body = document.getElementsByTagName("body")[0];
	var script = document.createElement("script");
	script.setAttribute("id", "jsonpScript");
	script.setAttribute("src", url);
	console.log(url);
	//console.log()

	var jsonpScript = document.getElementById("jsonpScript");
	if (jsonpScript) {
		body.removeChild(jsonpScript);
		//console.log(url);
	}

	body.appendChild(script);
}

function updateSales(sales) {
	console.log(sales);
	var salesDiv = document.getElementById("sales");
	//salesDiv.innerHTML = responseText;
/*		sales = JSON.parse(responseText);
*/		//console.log(sales);
	for (var i=0; i<sales.length; i++) {
		//string += sales[i].name + "  ";
		var div = document.createElement("div");
		div.setAttribute("class", "saleItem");
		div.innerHTML = sales[i].name + " sold " + sales[i].sales + " gumballs";
		salesDiv.appendChild(div);
	}

	if(sales.length > 0) {
		lastReportTime = sales[sales.length-1].time;
	}
}
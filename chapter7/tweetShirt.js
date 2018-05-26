window.onload = function() {
	var button = document.getElementById("previewButton");
	button.onclick = previewHandler;
};

function previewHandler() {
	//console.log("test");
	var canvas = document.getElementById("tshirtCanvas");
	context = canvas.getContext("2d");

	fillBackgroundColor(canvas, context); //以背景色覆盖之前绘制的内容

	var selectObj = document.getElementById("shape");
	var index = selectObj.selectedIndex;
	var shape = selectObj[index].value;
/*	console.log(selectObj);
	console.log(shape);*/

	//根据所选择的形状随机画20个方形或圆形
	if(shape == "squares") {
		for(var squares=0; squares < 20; squares++) {
			drawSquare(canvas, context); //画方形
		}
	} else if (shape == "circles") {
		for(var circle=0; circle < 20; circle++) {
			drawCircle(canvas, context); //画圆形
		}
	}

	drawText(canvas,context);
	drawImage(canvas, context);
}

function drawText(canvas, context) {
	var textColor = document.getElementById("textColor").value;

	context.fillStyle = textColor;
	context.font = "bold 1em sans-serif";
	context.textAlign = "left";
	//context.textBaseline = "middle";
	context.fillText("I saw this tweet", 20, 40);

	var tweetsElement = document.getElementById("tweets");
	var tweet = tweetsElement[tweetsElement.selectedIndex].innerText;
	
	context.font = "italic 1.2em serif";
	context.textAlign = "left"
	context.fillText(tweet, 30, 100);
	//console.log(tweet);

	context.textAlign = "right";
	context.font = "bold 1em sans-serif";
	context.fillText("and all I got was this lousy t-shirts", canvas.width-20, canvas.height-40, canvas.width);
}

function drawImage (canvas, context) {
	var twitterBird = new Image();
	twitterBird.src = "twitterBird.png";

	twitterBird.onload = function(){
		context.drawImage(twitterBird, 20, 120, 70, 70);
	};
}

function drawCircle(canvas, context) {
	//console.log("test");
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	var radius = Math.floor(Math.random() * 40);

	context.beginPath();
	context.arc(x, y, radius, 0, 2*Math.PI, true);

	//context.lineWidth = 4;
	//context.stroke();
	context.fillStyle="lightblue";
	context.fill();
}

function drawSquare(canvas, context) {
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	var w = Math.floor(Math.random() * 40);

	context.fillStyle = "lightblue";
	context.fillRect(x, y, w, w);

}

function fillBackgroundColor(canvas, context) {
	var backgroundColor = document.getElementById("backgroundColor").value;
	console.log(backgroundColor);

	context.fillStyle = backgroundColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	//console.log("badckground");

}

function updateTweets(tweets) {
	//console.log(tweets);
	var tweetsElement = document.getElementById("tweets");
	//console.log(tweetsElement);

	for(var i=0; i<tweets.length; i++) {
		var optionElement = document.createElement("option");
		optionElement.innerText = tweets[i].name;
		optionElement.value = tweets[i].name.replace("\"","'");
		tweetsElement.appendChild(optionElement);
		//console.log(tweets[i].name);
	}
}
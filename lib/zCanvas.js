// http://jsfiddle.net/m1erickson/bH38a/
// http://stackoverflow.com/questions/23626033/draw-a-line-on-mouse-drag-on-a-canvas-loaded-with-an-image

var strokeStyle = "green", lineWidth = 3, canvId= 'canvas' //az $("#colors_sketch"); 
var canvasOffset, offsetX, offsetY, ctx, lines, drawLines, drawLine;
var positionCanvas;
var colr= "blue", lwd= 3;

	function setColor(col){ctx.strokeStyle= colr= col;}
	function setLwd(_lwd){ctx.lineWidth= lwd= _lwd;}
	function clearCanv(){ctx.clearRect(0, 0, canvas.width, canvas.height); lines=[]}

//$(function(){  //------------------------------------------------------------------------------------------
function runCanvas(){  //------------------------------------------------------------------------------------------

var containerr=  $("#canvas");  //az $("#colors_sketch"); //

var canvas = document.getElementById('canvas');
 ctx = canvas.getContext("2d");

// canvasOffset = $("#canvas").offset();
// offsetX = canvasOffset.left;
// offsetY = canvasOffset.top;

var startX, startY, mouseX, mouseY;
var isDown = false;

lines = [];

var imageOpacity = 0.33;


// var img = new Image();
// img.crossOrigin = "anonymous";
// img.onload = start;
// img.src = "https://dl.dropboxusercontent.com/u/139992952/multple/heart.jpg";

    $("#canvas").mousedown(function (e) { handleMouseDown(e); });
    $("#canvas").mousemove(function (e) { handleMouseMove(e); });
    $("#canvas").mouseup  (function (e) { handleMouseUp(e);   });
    $("#canvas").mouseout (function (e) { handleMouseUp(e);   });
	

// positionCanvas('zCanvas');

start();

function start() {


    // canvas.width  = 300; //img.width;
    // canvas.height = 300; //img.height;
	
	
    ctx.strokeStyle = strokeStyle; //az "green";
    ctx.lineWidth = lineWidth;  //az 3;
	
	// console.log('started:', canvas.width, canvas.height, ctx.strokeStyle, ctx.lineWidth);

    // $("#canvas").mousedown(function (e) { handleMouseDown(e); });
    // $("#canvas").mousemove(function (e) { handleMouseMove(e); });
    // $("#canvas").mouseup  (function (e) { handleMouseUp(e);   });
    // $("#canvas").mouseout (function (e) { handleMouseUp(e);   });

    // redraw the image
    //drawTheImage(img, imageOpacity);
}

drawLines= function (toX, toY, col, lwd) {   	// console.log('drawLines:', toX, toY);

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // redraw the image
    // drawTheImage(img, imageOpacity);

    // redraw all previous lines
    for (var i = 0; i < lines.length; i++) {
        drawLine(lines[i]);
    }

    // draw the current line
    drawLine({
        x1: startX,
        y1: startY,
        x2: mouseX,
        y2: mouseY,
		col: colr, // ctx.strokeStyle,
		lwd: lwd  //ctx.lineWidth
    });
}

function drawTheImage(img, opacity) {
    ctx.globalAlpha = opacity;
    ctx.drawImage(img, 0, 0);
    ctx.globalAlpha = 1.00;
}

drawLine= function (line) {
	// console.log('drawLine:', line);
	ctx.strokeStyle= line.col;
	ctx.lineWidth= line.lwd;

    ctx.beginPath();
    
    if(line.x2== null){ //arc
		ctx.arc(line.x1, line.y1, line.lwd+.1, 0,2*Math.PI);
    } else {  //line
	    ctx.moveTo(line.x1, line.y1);
	    ctx.lineTo(line.x2, line.y2);    	
    }

    ctx.stroke();
}




function handleMouseDown(e) {
	// console.log('handleMouseDown:', e);
	 if (e.originalEvent && e.originalEvent.targetTouches) {
        e.pageX = e.originalEvent.targetTouches[0].pageX;
        e.pageY = e.originalEvent.targetTouches[0].pageY;
		// console.log('handleMouseDown, e.pageX, e.pageY:', e.pageX, e.pageY);
		// console.log('handleMouseDown, e.clientY, offsetY:', e.clientY, offsetY);
     }
	 
	 ctx.strokeStyle= colr;
	 ctx.strokeWidth= lwd;
	 
	 if(1){
	    ctx.beginPath();
		ctx.arc(e.pageX- offsetX, e.pageY- offsetY, lwd+.1, 0,2*Math.PI);
		ctx.stroke();
		
	    lines.push({
	        x1: e.pageX- offsetX,
	        y1: e.pageY- offsetY,
	        x2: null,
	        y2: null,
			col: colr,  // ctx.strokeStyle,
			lwd: lwd  //ctx.lineWidth
	    });
	 }

    e.stopPropagation();
    e.preventDefault();
	
 	mouseX = e.pageX - offsetX;  // this.offsetLeft;   //az2 http://jsfiddle.net/euXJC/1/
    mouseY = e.pageY - offsetY;  // this.offsetTop;    //az2 http://jsfiddle.net/euXJC/1/


    // Put your mousedown stuff here
    startX = mouseX;
    startY = mouseY;
    isDown = true;
}

function handleMouseUp(e) {
    e.stopPropagation();
    e.preventDefault();

    // Put your mouseup stuff here
    isDown = false;
	
	if(startX == undefined) return;  //az
	
    lines.push({
        x1: startX,
        y1: startY,
        x2: mouseX,
        y2: mouseY,
		col: colr,  // ctx.strokeStyle,
		lwd: lwd  //ctx.lineWidth
    });
	// console.log('handleMouseUp done  lines:', lines);
	// console.log('handleMouseUp done: e:', e);
}

function handleMouseMove(e) {
    if (!isDown) {   return; }
	
    e.stopPropagation();
    e.preventDefault();
	
	   //az
	// mouseX = parseInt(e.clientX - offsetX);
    // mouseY = parseInt(e.clientY - offsetY);
	
	// ctx.strokeStyle= colr;

	
    mouseX = e.originalEvent.layerX; //az
    mouseY = e.originalEvent.layerY; //az
	
	mouseX = e.pageX - offsetX //this.offsetLeft;   //az2 http://jsfiddle.net/euXJC/1/
    mouseY = e.pageY - offsetY  //this.offsetTop;    //az2 http://jsfiddle.net/euXJC/1/

	// mouseX = e.clientX - offsetX;  // this.offsetLeft;   //az2 http://jsfiddle.net/euXJC/1/
    // mouseY = e.clientY - offsetY;  // this.offsetTop;    //az2 http://jsfiddle.net/euXJC/1/

	

    // Put your mousemove stuff here
    drawLines(mouseX, mouseY, colr, lwd);

}


$("#save").click(function () {
    var html = "<p>Right-click on image below and Save-Picture-As</p>";
    html += "<img src='" + canvas.toDataURL("image/jpeg") + "' alt='from canvas'/>";
    //var tab = window.open();
    // tab.document.write(html);
	return window.open(canvas.toDataURL("image/png"));
});

//}); // end $(function(){});
}
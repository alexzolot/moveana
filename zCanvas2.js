// http://jsfiddle.net/s34PL/2/
// http://stackoverflow.com/questions/23626033/draw-a-line-on-mouse-drag-on-a-canvas-loaded-with-an-image

var strokeStyle = "green", lineWidth = 3, canvId= 'canvas' //az $("#colors_sketch"); 
var canvasOffset;

$(function(){

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var canvasPos = canvas.getBoundingClientRect();

var dragging = false;

drawImage();

$(canvas).mousedown(mouseDown);
$(canvas).mouseup(mouseUp);
$(canvas).mousemove(mouseMove);

function drawImage() {
    var img = new Image();
    img.src = 'http://img2.timeinc.net/health/img/web/2013/03/slides/cat-allergies-400x400.jpg';
    
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    };
}

function mouseDown(e) {
    var pos = getCursorPosition(e);
                
    dragging = true;

    ctx.strokeStyle = 'rgba(0, 100, 0, 0.25)';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 15;
    ctx.beginPath();
    
	ctx.moveTo(pos.x, pos.y);
	
	//az http://stackoverflow.com/questions/20857593/canvas-mouse-event-position-different-than-cursor
	// var clreg= canvas.getBoundingClientRect();
    // ctx.moveTo(pos.x - clreg.left, pos.y- clreg.top);
}
            
function mouseUp(e) {
    dragging = false;
}

function mouseMove(e) {
    var pos, i;

    if (!dragging) {
        return;
    }
	
	    e.preventDefault(); //az

    
    pos = getCursorPosition(e);

    //az  ctx.lineTo(pos.x, pos.y);
	//var clreg= canvas.getBoundingClientRect();

    //ctx.lineTo(pos.x- clreg.left, pos.y- clreg.top);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function getCursorPosition(e) {
    return {
        x: e.clientX - canvasPos.left,
        y: e.clientY - canvasPos.top
    };
}


}); // end $(function(){});
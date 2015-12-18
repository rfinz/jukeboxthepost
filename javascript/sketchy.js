var imgQ = [];
var bloglist = [];
var tumblrApiUrl = 'https://api.tumblr.com/v2/blog/'
var tumblrApiKey = '0jzY067qvcobXBg8JSRLK6YkOjMOUPqgPIW6siNQBrueMlIIGb';

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0, 100, 200);
    button = createButton('+');
    button.position(20, 20);
    button.mousePressed(addBlog);
}

function draw(){

}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function addBlog(){
    background(0, 200, 100);
    btn = this;
    input = createInput();
    input.position(60, 18);
    input.elt.focus();
    input.elt.onkeypress = function(e){
	if(e.which == 13){
	    input.elt.blur();
	    attemptBlog(btn, input);
	}
    };

    btn.elt.disabled = true;

}

function attemptBlog(btn, inp){
    btn.elt.disabled = false;
    $.ajax({
	url: tumblrApiUrl+inp.value()+'/avatar',
	type: 'GET',
	dataType: 'json',
	success: function(){
	    bloglist.push(inp.value());
	    inp.remove();
	},
	error: function(){
	    fill(255, 0, 0);
	    inp.remove();
	    textAlign(LEFT, TOP);
	    textFont("Courier");
	    text("Not a real tumblog :(", 60, 24);
	}
    });
}

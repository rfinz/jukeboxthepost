var imgQ = [];
var bloglist = [];
var tumblrApiUrl = 'https://api.tumblr.com/v2/blog/';
var tumblrApiKey = '0jzY067qvcobXBg8JSRLK6YkOjMOUPqgPIW6siNQBrueMlIIGb';
var blogInput, addBlogButton;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0, 100, 200);

    addBlogButton = createButton('+');
    addBlogButton.position(20, 20);
    addBlogButton.mousePressed(addBlog);

    blogInput = createInput();

}

function draw(){
    add2Q(null);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function addBlog(){
    background(0, 200, 100);
    blogInput.position(60, 18);
    blogInput.show();
    blogInput.elt.focus();
    blogInput.elt.onkeypress = function(e){
	if(e.which == 13){
	    blogInput.elt.blur();
	    attemptBlog();
	}
    };

    addBlogButton.elt.disabled = true;

}

function attemptBlog(){
    addBlogButton.elt.disabled = false;
    $.ajax({
	url: tumblrApiUrl+blogInput.value()+'.tumblr.com/avatar',
	type: 'GET',
	dataType: 'jsonp',
	data:{
	    jsonp: "blogcheck"
	}
    });
}

function getBlogInfo(blog){
    $.ajax({
	url: tumblrApiUrl+blog+'.tumblr.com/info',
	type: 'GET',
	dataType: 'jsonp',
	data:{
	    api_key: tumblrApiKey,
	    jsonp: "bloginfo"
	}
    });
}

function blogcheck(data){
    if(isValid(data.response)){
	if($.grep(bloglist, function(e){ return e.blog === blogInput.value()}).length < 1){
	    bloglist.push({blog: blogInput.value()});
	}
	blogInput.hide();
	getBlogInfo(blogInput.value());
    } else {
	fill(255, 0, 0);
	blogInput.hide();
	textAlign(LEFT, TOP);
	textFont("Courier");
	text("Not a real tumblog :(", 60, 24);
    }
}

function bloginfo(data){
    if (isValid(data.response)){
	blog = $.grep(bloglist, function(e){ return e.blog === data.response.blog.name })[0];
	blog.posts = data.response.blog.posts;
	blog.url = data.response.blog.url;
	background(0, 100, 200);
	blogInput.value("");
    }
}

function add2Q(data){
    if(data !== null){



    } else {




    }
}

function isValid(obj){
    if((Object.prototype.toString.call(obj) === '[object Array]' &&
	typeof obj != "undefined" &&
	obj != null &&
	obj.length > 0) ||
       ((Object.prototype.toString.call(obj) !== '[object Array]' &&
	obj != null))
      ){
	return true;
    } else {
	return false;
    }
}

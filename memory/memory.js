// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {
});

function showNext(){
	if(window.getComputedStyle(document.getElementById("post2")).visibility === "hidden") {
		document.getElementById("post2").style.visibility = "visible";
	}
	else if(window.getComputedStyle(document.getElementById("post3")).visibility === "hidden") {
		document.getElementById("post3").style.visibility = "visible";
	}
	else if(window.getComputedStyle(document.getElementById("post4")).visibility === "hidden") {
		document.getElementById("post4").style.visibility = "visible";
	}
	else if(window.getComputedStyle(document.getElementById("post5")).visibility === "hidden") {
		document.getElementById("post5").style.visibility = "visible";
	}
	else if(window.getComputedStyle(document.getElementById("post6")).visibility === "hidden") {
		document.getElementById("post6").style.visibility = "visible";
	}
	else if(window.getComputedStyle(document.getElementById("post7")).visibility === "hidden") {
		document.getElementById("post7").style.visibility = "visible";
	}
	else if(window.getComputedStyle(document.getElementById("post8")).visibility === "hidden") {
		document.getElementById("post8").style.visibility = "visible";
	}
	else{
		alert("Error! No more space to add new memory!");
	}
}
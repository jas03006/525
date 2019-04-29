// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {
});
/*
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
}*/

function go_add_memory(){
	// 뒤로가기 누르면 다시 앞페이지로 이동
    window.history.forward(1);
    // 기존 페이지를 새로운 페이지로 변경
    location.replace("https://jas03006.github.io/525/add_new_memory/Add_new_memory.html");
}

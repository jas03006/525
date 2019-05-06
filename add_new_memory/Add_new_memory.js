

function change_star(event){
	var x = event.clientX;
	var offset = event.target.offsetLeft;
	var width = (x-offset);
	var num_star = 0;
	var star_half_width = 205/10.0;
	console.log(offset);
	console.log(star_half_width );
	if( x >= offset ){
		num_star = 0;
		while(width>=0){
			width = width - star_half_width;
			num_star += 0.5;
		}
		document.getElementById("star").children[0].children[0].style = 'width:' + (num_star * 20) +'%';
		//document.getElementById("star").innerHTML += x;
	}
	return num_star;
}

function go_main(){
    // 뒤로가기 누르면 다시 앞페이지로 이동
    window.history.forward(1);
    // 기존 페이지를 새로운 페이지로 변경
    location.replace("https://jas03006.github.io/525/memory.html");
}


var title_ = document.getElementById("Title");
var date_ = document.getElementById("Date");
var where_ = document.getElementById("Where");
var with_ = document.getElementById("With");
var what_ = document.getElementById("What");
var how_long_ = document.getElementById("How_long");
var why_ = document.getElementById("Why");
var what_you_felt_ = document.getElementById("What_you_felt");

var importance_ = 0;


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
	importance_ = num_star;
	return false;
}

function add_new_memory_db(){
	document.getElementById("overlay").style.width = "100%";
	create_new_memory_db();
	write_new_memory_db();
	document.getElementById("overlay").style.width = "0";
	window.history.forward(1);
	location.replace("../memory.html");
}

function create_new_memory_db(){
	var new_title = title_.value.trim();
	var ref = firebase.database().ref('/data/' + now_account + '/memory/');
	var new_memory_key = ref.child(new_title).set({
		Date: '' ,
		How_long: ''	,
		What_you_did: '',
		What_you_felt: '',
		Where: '',
		Why: '',
		With_whom: '',
		importance: 0
	});
}

function write_new_memory_db(){
	firebase.database().ref('/data/' + now_account + '/memory/' + title_.value.trim() ).set({
		Date: date_.value.trim() ,
		How_long: how_long_.value.trim()	,
		What_you_did: what_.value.trim(),
		What_you_felt: what_you_felt_.value.trim(),
		Where: where_.value.trim(),
		Why: why_.value.trim(),
		With_whom: with_.value.trim(),
		importance: importance_
	});

	return false;
}

function read_new_memory_db(){
	document.getElementById("overlay").style.width = "100%";
	firebase.database().ref('/data/' + now_account + '/memory/' + title.value.trim() ).once('value', function(snapshot){ 
								
								console.log(snapshot.val());

								document.getElementById("overlay").style.width = "0";
							});
}


function go_main(){
    // 뒤로가기 누르면 다시 앞페이지로 이동
    window.history.forward(1);
    // 기존 페이지를 새로운 페이지로 변경
    location.replace("../index.html");
}


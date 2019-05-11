﻿var title_ = document.getElementById("Title");
var date_ = document.getElementById("Date");
var where_ = document.getElementById("Where");
var with_ = document.getElementById("With");
var what_ = document.getElementById("What");
var how_long_ = document.getElementById("How_long");
var why_ = document.getElementById("Why");
var what_you_felt_ = document.getElementById("What_you_felt");

var importance_ = 0;

var title_value =  localStorage.getItem("memory_name");

function change_star(event){
	var x = event.clientX;
	var offset = event.target.offsetLeft;
	var width = (x-offset);
	var num_star = 0;
	var star_width = 205/5.0;
	console.log(offset);
	console.log(star_width );
	if( (x >= offset) ){
		num_star = 0;
		while(width>=0){
			width = width - star_width;
			num_star += 1;
		}
		document.getElementById("star").children[0].children[0].style = 'width:' + (num_star * 33.33) +'%';
		//document.getElementById("star").innerHTML += x;
	}
	importance_ = num_star;
	return false;
}

function add_new_memory_db(){
	
	document.getElementById("overlay").style.width = "100%";
	if( alert_error() ){
		if(title_.value.trim() != title_value){
			delete_memory(title_value);
		}
		create_new_memory_db(); 
		write_new_memory_db();
		document.getElementById("overlay").style.width = "0";
		window.history.forward(1);
		location.replace("../memory.html");
	}else{
		document.getElementById("overlay").style.width = "0";
	}
}

function delete_memory(title){
	var path = '/data/' + now_account + '/memory/' ;
	var ref = firebase.database().ref(path+title);
	ref.remove();
}

function create_new_memory_db(){
	var path = '/data/' + now_account + '/memory/' ;
	var new_title = title_.value.trim();
	var ref = firebase.database().ref(path);
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
	return true;
}

function alert_error( ){
	var no_error = true;
	var new_title = title_.value.trim();
	
	if(new_title == ''){ //title
		document.getElementsByClassName("stage_subtitle")[0].style.color = 'red';
		title_.style.borderColor = 'red';
		no_error = false;
		title_.focus();
	}else{
		document.getElementsByClassName("stage_subtitle")[0].style.color = 'black';
		title_.style.borderColor = '#748695';
	}

	if( date_.value == '' ){
		document.getElementsByClassName("stage_subtitle")[1].style.color = 'red';
		date_.style.borderColor = 'red';
		no_error = false;
		date_.focus();
	}else{
		document.getElementsByClassName("stage_subtitle")[1].style.color = 'black';
		date_.style.borderColor = '#748695';
	}

	if(importance_ == 0){ //importance
		document.getElementsByClassName("stage_subtitle")[8].style.color = 'red';
		no_error = false;
	}else{
		document.getElementsByClassName("stage_subtitle")[8].style.color = 'black';
	}
	return no_error;
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


function read_now_account(){
	
	document.getElementById("overlay").style.width = "100%";
	return new Promise(function(resolve, reject){
		firebase.database().ref('/now_account/now_ID').once('value', function(snapshot){ 
								console.log('read_now\n');
								now_account = snapshot.val().trim();
								if(now_account == ''){
    									window.history.forward(1);
  									location.replace("../index.html");
								}else{
									document.getElementsByClassName("account")[0].getElementsByTagName("a")[0].innerHTML = now_account;
								}
								console.log(now_account);
								document.getElementById("overlay").style.width = "0";
								read_memory_db(now_account);							
								resolve(now_account);
							});
		});
}
	

function draw_star(num_star){
		document.getElementById("star").children[0].children[0].style = 'width:' + (num_star * 33.33) +'%';
	return false;
}

function read_memory_db( ID ){
	var path = '/data/' + ID + '/memory/' + title_value;
	document.getElementById("overlay").style.width = "100%";
	firebase.database().ref(path).once('value', function(snapshot){ 
								console.log(path);
								var data = snapshot.val();
								console.log(data);
								
								title_.value = title_value;
								date_.value = data['Date'];
								how_long_.value = data['How_long'];
								what_.value = data['What_you_did'];
								what_you_felt_.value = data['What_you_felt'];
								where_.value = data['Where'];
								why_.value = data['Why'];
								with_.value = data['With_whom'];
								importance_ = data['importance'];
								
								draw_star(importance_);

								document.getElementById("overlay").style.width = "0";
							});
}


function go_main(){
    // 뒤로가기 누르면 다시 앞페이지로 이동
    window.history.forward(1);
    // 기존 페이지를 새로운 페이지로 변경
    location.replace("../index.html");
}


function go_memory_page(){
    window.history.forward(1);
    location.replace("../memory.html");
}
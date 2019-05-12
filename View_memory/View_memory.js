var title_ = document.getElementById("Title");
var date_ = document.getElementById("Date");
var where_ = document.getElementById("Where");
var with_ = document.getElementById("With");
var what_ = document.getElementById("What");
var how_long_ = document.getElementById("How_long");
var why_ = document.getElementById("Why");
var what_you_felt_ = document.getElementById("What_you_felt");

var importance_ = 0;

var title_value = localStorage.getItem("memory_name"); //"test_memory1"; 

$( document ).ready(function() {
	//window.onload = alert(localStorage.getItem("account_ID"));
	//read_memory_db(now_account);
});

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
								
								title_.innerHTML = title_value;
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


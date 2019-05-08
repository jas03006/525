
  var firebaseConfig = {
    apiKey: "AIzaSyDAB7VdqDpWJ9-LPG9rT5H7dWR6m8EaGrQ",
    authDomain: "hci525.firebaseapp.com",
    databaseURL: "https://hci525.firebaseio.com",
    projectId: "hci525",
    storageBucket: "hci525.appspot.com",
    messagingSenderId: "299033067890",
    appId: "1:299033067890:web:39f73e6323e5bb1f"
  };

  firebase.initializeApp(firebaseConfig);

var header = document.getElementsByTagName("header")[0];

var accounts = [];
var user_ID = document.getElementById("ID");
var password = document.getElementById("PASSWORD");
var now_account = '';
var memories = [];
var projects = [];
var drafts = [];

$( document ).ready(function() {
	main();
});

function main(){
	read_accounts();
	read_now_account();
	
	
}

function login(){
	if(check_account()){
		read_now_account();
		console.log('passed\n');
	}else{
		console.log('not passed\n');
		popup_login_fail();
	}
//	read_memories();
//	read_projects();
//	read_drafts();
}

function read_accounts(){
	firebase.database().ref('/accounts/pairs').once('value', function(snapshot){ 
								parse_accounts( snapshot.val() +'');
							});
	return false;
}

function parse_accounts( data ){
	var arr1 = data.split(')');
	for(var i=0; i<arr1.length; i++){
		if(arr1[i] == ""){
			continue;
		}
		var arr2 = arr1[i].replace('(','').split(',');	
		arr2[1] = arr2[1]+'';
		accounts.push( {'ID': arr2[0].trim() ,'PASSWORD': arr2[1].trim()} );
	}
	console.log(accounts);
	return false;
}

function check_account(){
	for(var i =0; i< accounts.length; i++){
		var now = accounts[i];
		if(now['ID'].trim() == user_ID.value.trim()){
			console.log(now['ID']);	
			if(now['PASSWORD'] == (password.value+'') ){
				console.log(now['PASSWORD']);
				//allow_login = true;
				write_now_account();
				return true;
			}else{
				break;
			}	
		}
	}
	//allow_login = false;
	return false;
}

function write_now_account(){
	firebase.database().ref('/now_account/').set({
		now_ID: user_ID.value.trim()
	});

	return false;
}

function read_now_account(){
	console.log('read_now\n');
	document.getElementById("overlay").style.width = "100%";
	firebase.database().ref('/now_account/now_ID').once('value', function(snapshot){ 
								
								now_account = snapshot.val().trim();
								if(now_account != ''){
									go_logined_page();
								}
								document.getElementById("overlay").style.width = "0";
							});
}



function go_logined_page(){
	header.style.display = "block";
	document.getElementsByTagName("body")[0].style.marginTop = '75px';
	document.getElementById("login_page").style.display = 'none';
	document.getElementById("tutorial").style.width = '1820px';
	document.getElementsByClassName("account")[0].getElementsByTagName("a")[0].innerHTML = now_account;
}

function go_logouted_page(){
	header.style.display = "none";
	document.getElementsByTagName("body")[0].style.marginTop = '0px';
	document.getElementById("login_page").style.display = '';
	document.getElementById("tutorial").style.width = '1330px';
	document.getElementsByClassName("account")[0].getElementsByTagName("a")[0].innerHTML = 'login';
}


function popup_login_fail(){
	document.getElementById("login_fail_popup").style.display = 'block';
	return false;
}

function popdown_login_fail(){
	document.getElementById("login_fail_popup").style.display = 'none';
	return false;
}

function logout(){
	now_account = "";
	firebase.database().ref('/now_account/').set({
		now_ID: now_account
	});
	popdown_logout();
	go_logouted_page();
	return false;
}

function popup_logout(){
	document.getElementById("logout_popup").style.display = 'block';
	return false;
}

function popdown_logout(){
	document.getElementById("logout_popup").style.display = 'none';
	return false;
}








function read_memories(){

}

function read_projects(){

}


function read_drafts(){
	var result;
	 firebase.database().ref('/database/'+ user_ID.value.trim() +'/projects/').once('value', function(snapshot){ 
								mytable.innerHTML =  snapshot.val();
								
								get_elements();
								question.innerHTML = pairs[index ]['country'];	

								update_history();
								set_onclick_functions();
								show_on_map(question);
								press_enter();
								auto_complete();
							});
	return result;
}
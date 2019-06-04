
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


var accounts = [];
var now_account = '';

$( document ).ready(function() {
	main();
});

function main(){
	//read_accounts();
	return read_now_account().then(function(data){ now_account = data; });
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

function read_now_account(){
	
	document.getElementById("overlay").style.width = "100%";
	return new Promise(function(resolve, reject){
		firebase.database().ref('/now_account/now_ID').once('value', function(snapshot){ 
			console.log('read_now\n');
			now_account = snapshot.val().trim();
			if(now_account == ''){
				location.href = "../index.html";
				//window.history.forward(1);
				//location.replace("../index.html");
			}else{
				document.getElementsByClassName("account")[0].getElementsByTagName("a")[0].innerHTML = now_account;
			}
			console.log(now_account);
			document.getElementById("overlay").style.width = "0";

			resolve(now_account);
		});
	});
}


function go_logouted_page(){
	document.getElementsByClassName("account")[0].getElementsByTagName("a")[0].innerHTML = 'login';
	location.href = "../index.html";
	//window.history.forward(1);
	//location.replace("../index.html");
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


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
var user_ID = document.getElementById("ID").value.trim();
var password = document.getElementById("PASSWORD").value+'';
var allow_login;
var memories = [];
var projects = [];
var drafts = [];

main();

function main(){
	read_accounts();
}

function login(){
	if(check_account()){
		console.log('passed\n');
	}else{
		console.log('not passed\n');
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
		if(now['ID'].trim() == user_ID.trim()){
			console.log(now['ID']);	
			if(now['PASSWORD'] == password ){
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
		now_ID: user_ID
	});

	return false;
}




function read_memories(){

}

function read_projects(){

}


function read_drafts(){
	var result;
	 firebase.database().ref('/database/'+ user_ID +'/projects/').once('value', function(snapshot){ 
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
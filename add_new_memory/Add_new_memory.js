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

function add_new_memory_db( check ){
	
	document.getElementById("overlay").style.width = "100%";
	if( check ){
		create_new_memory_db(); 
		write_new_memory_db();
		document.getElementById("overlay").style.width = "0";
		//window.history.forward(1);
		//location.replace("../memory.html");
	}else{
		document.getElementById("overlay").style.width = "0";
	}
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

function alert_error( check ){
	var no_error = true;
	var new_title = title_.value.trim();
	
	if(new_title == ''){ //title
		document.getElementsByClassName("stage_subtitle")[0].style.color = 'red';
		title_.style.borderColor = 'red';
		document.getElementById("null_title").style.display = 'block';
		document.getElementById("existing_title").style.display = 'none';
		no_error = false;
		title_.focus();
	}else if( check == false ){
		document.getElementsByClassName("stage_subtitle")[0].style.color = 'red';
		title_.style.borderColor = 'red';
		document.getElementById("existing_title").style.display = 'block';
		document.getElementById("null_title").style.display = 'none';
		no_error = false;
		title_.focus();
	}else{
		document.getElementsByClassName("stage_subtitle")[0].style.color = 'black';
		title_.style.borderColor = '#748695';
		document.getElementById("null_title").style.display = 'none';
		document.getElementById("existing_title").style.display = 'none';
	}

	if( date_.value == '' ){
		document.getElementsByClassName("stage_subtitle")[1].style.color = 'red';
		date_.style.borderColor = 'red';
		document.getElementById("null_date").style.display = 'block';
		no_error = false;
		date_.focus();
	}else{
		document.getElementsByClassName("stage_subtitle")[1].style.color = 'black';
		date_.style.borderColor = '#748695';
		document.getElementById("null_date").style.display = 'none';
	}

	if(importance_ == 0){ //importance
		document.getElementsByClassName("stage_subtitle")[8].style.color = 'red';
		document.getElementById("null_importance").style.display = 'block';
		no_error = false;
	}else{
		document.getElementsByClassName("stage_subtitle")[8].style.color = 'black';
		document.getElementById("null_importance").style.display = 'none';
	}
	return no_error;
}

function confirm(){
	var path = '/data/' + now_account + '/memory/' ;
	var new_title = title_.value.trim();
	var test_ref = firebase.database().ref(path + new_title);
	firebase.database().ref(path).once('value',function(snapshot){
					var myValue = snapshot.val();
					if(myValue != null){
					var titles = Object.keys(myValue);
					
					for(var i = 0; i < titles.length; i++){
						console.log(titles[i]);
						if(new_title == titles[i].trim()){
							add_new_memory_db(  alert_error( false ) );
							return false;
						}
					}
					}
					add_new_memory_db( alert_error( true ));
					return false;
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
	update_flowchart_db();
	return false;
}

function update_flowchart_db(){
	var YYYYMMDD = parseDate(date_.value.trim());
	var projects =  firebase.database().ref("data/testuser1/project");
	console.log(projects);
	if(projects == null){
			console.log('projects is null!');
			window.history.forward(1);
			location.replace("../memory.html");
        			return;
      	}
	 projects.once('value', function(snapshot){
      		var myValue = snapshot.val();
      		if(myValue == null){
			console.log('flowchart is null!');
			window.history.forward(1);
			location.replace("../memory.html");
        			return;
      		}
		var project_keys = Object.keys(myValue);

	for(var i = 0; i < project_keys.length; i++){
		var  tableHis = firebase.database().ref("data/testuser1/project/" + project_keys[i] + "/flowchart");
		var dic = {
      			title:  title_.value.trim(),
       			year: YYYYMMDD[0],
        			month: YYYYMMDD[1],
       			date: YYYYMMDD[2],
      			importance: importance_,
        			comment: ""
     		 };
    		console.log(tableHis);
    		tableHis.push(dic);
	}
	
		window.history.forward(1);
		location.replace("../memory.html");
	});
}

function parseDate(date){
  var dates = date.split("-");
  for(var i = 0; i < dates.length; i++){
    dates[i] = parseInt(dates[i]);
  }
  return dates;
}


function go_main(){
    // 뒤로가기 누르면 다시 앞페이지로 이동
    window.history.forward(1);
    // 기존 페이지를 새로운 페이지로 변경
    location.replace("../index.html");
}


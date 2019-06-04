
function initialize(){
  makeProjects();
}

function makeProjects(){
  makeap();
  setTimeout(function() {
    read_project_db();
  }, 100);
}

//add project box
function makeap() { 
  var projectWrapper = document.createElement("div");
  projectWrapper.className = "project_wrapper";
  projectWrapper.id = "project0"; // = add project tab


  var projectImage = document.createElement("div");
  projectImage.innerHTML = '<img src="./src/image/project/new_project.png" width="200" border="0">';
  projectWrapper.appendChild(projectImage);
  projectImage.addEventListener("click", function() {
    ProjectNameDiv.style.display = "block";
    AddDiv.style.display = "block";
    DeleteDiv.style.display ="block";
    AddProject.style.display = "none";
    ProjectName.focus();
  });

  var AddDiv = document.createElement("div");
  var AddButton = document.createElement("a");
  AddButton.id = "AddButton";
  AddButton.innerHTML = 'Add Paper';
  AddButton.addEventListener("click", function() {
    Add();
  });
  AddDiv.appendChild(AddButton);
  AddDiv.id = "AddDiv";
  AddDiv.style.display = 'none';  
  projectImage.appendChild(AddDiv);


  var AddProject = document.createElement("div");
  AddProject.className = "add_project";
  AddProject.id = "AddProject";
  AddProject.innerHTML = '<h2>ADD PERSONAL STATEMENT</h2>';
  projectImage.appendChild(AddProject);

  var ProjectNameDiv = document.createElement("div");
  ProjectNameDiv.id = "ProjectNameDiv";
  ProjectNameDiv.innerHTML = "<input type = 'text' id = 'ProjectName' placeholder = 'Paper Name'onkeyup='enterkey();'>"
  ProjectNameDiv.style.display = "none";
  projectWrapper.appendChild(ProjectNameDiv);

  var DeleteDiv = document.createElement("div");
  var DeleteButton = document.createElement("a");
  DeleteButton.innerHTML = '<i class="fas fa-times"></i>';
  DeleteButton.id = "DeleteButton";
  DeleteButton.addEventListener("click", function() {
    setTimeout(function() {
      document.getElementById("ProjectName").value = "";
      AddDiv.style.display = "none";
      ProjectNameDiv.style.display = "none";
      DeleteDiv.style.display ="none";
      AddProject.style.display = "block";

    },50);
  });
  DeleteDiv.appendChild(DeleteButton);
  DeleteDiv.id = "DeleteDiv0";
  DeleteDiv.style.display = 'none';  
  projectImage.appendChild(DeleteDiv);

  document.getElementById("projects").appendChild(projectWrapper);  
}

//project boxs
function makep(title,date,key,writable){
  var projectWrapper = document.createElement("div");
  projectWrapper.className = "project_wrapper";
  projectWrapper.id = key;
  projectWrapper.addEventListener("mouseleave", function () {
      //leave
      TitleDate.style.display = 'block';    
      EditDiv.style.display = 'none';    
      WriteDiv.style.display = 'none';    
      TitleDateh.style.display = 'none';    
      DeleteDiv.style.display = 'none';    
      this.style.boxShadow = "none";
    });
  projectWrapper.addEventListener("mouseenter", function () {
      //enter
      TitleDate.style.display = 'none';    
      EditDiv.style.display = 'block';    
      WriteDiv.style.display = 'block';    
      TitleDateh.style.display = 'block';    
      DeleteDiv.style.display = 'block';    
      this.style.boxShadow = "0px 0px 20px #777777";
    });

  //background image
  var projectImage = document.createElement("div");
  projectImage.className = "project_image";
  projectImage.id = projectWrapper.id+"_image";
  projectImage.innerHTML = '<img src="./src/image/project/empty_project.png" width="200" border="0">';
  projectWrapper.appendChild(projectImage);

  //title and date
  var TitleDate = document.createElement("div");
  TitleDate.innerHTML = "<h1>"+title + "</h1><br>" + date.substring(0,10);
  TitleDate.style.display = 'block';
  TitleDate.id = "TitleDate";
  projectImage.appendChild(TitleDate);

  //title and date when it hover
  var TitleDateh = document.createElement("div"); 
  TitleDateh.innerHTML = "<h1>"+title + "</h1><br>" + date;
  TitleDateh.style.display = 'none';
  TitleDateh.id = "TitleDateh";
  projectImage.appendChild(TitleDateh);

  //edit project button
  var EditDiv = document.createElement("div");
  var EditButton = document.createElement("a");
  EditButton.id = "Button";
  if (writable) {
    EditButton.innerHTML = 'Edit Paper';
  } else {
    EditButton.innerHTML = 'Start Paper';
  }
  EditButton.addEventListener("click", function() {
    localStorage.setItem("currentproject", title);
    localStorage.setItem("currentkey", key);
    location.href = "./Add_Questions/Add_Questions.html";
    //location.replace("./Add_Questions/Add_Questions.html");
  });
  EditDiv.appendChild(EditButton);
  EditDiv.id = "EditDiv";
  EditDiv.style.display = 'none';  
  projectImage.appendChild(EditDiv);

  //write draft button
  var WriteDiv = document.createElement("div");
  var WriteButton = document.createElement("a");
  if (writable) {
    WriteButton.id = "Button";
  } else {
    WriteButton.id = "DisableButton";
  }
  WriteButton.innerHTML = 'Write Draft';
  WriteButton.addEventListener("click", function() {
    if (writable) {
      localStorage.setItem("currentproject", title);
      localStorage.setItem("currentkey", key);
      location.href = "./Draft/Draft.html";
      //location.replace("./Draft/Draft.html");      
    } else {

    }
  });
  WriteDiv.appendChild(WriteButton);
  WriteDiv.id = "WriteDiv";
  WriteDiv.style.display = 'none';  
  projectImage.appendChild(WriteDiv);

  var DeleteDiv = document.createElement("div");
  var DeleteButton = document.createElement("a");
  DeleteButton.innerHTML = '<i class="fas fa-times"></i>';
  DeleteButton.id = "DeleteButton";
  DeleteButton.addEventListener("click", function() {
    if (confirm('Are you sure you want to Delete? This cannot be undone.')) {
      delete_project_db(key);
      document.getElementById(projectWrapper.id).remove();
    } else {

    }
  });
  DeleteDiv.appendChild(DeleteButton);
  DeleteDiv.id = "DeleteDiv";
  DeleteDiv.style.display = 'none';  
  projectImage.appendChild(DeleteDiv);

  document.getElementById("project0").after(projectWrapper);  

}

function Add() {
  var title = document.getElementById("ProjectName").value; 
  if (title == "") {
    alert("you should write Paper title");
    document.getElementById("ProjectName").focus; 
  } else {
    var date = getTime();
    var key = create_new_Project_db(title,date);
    makep(title,date,key,false);
    setTimeout(function() {
      document.getElementById("ProjectName").value = "";
      document.getElementById("AddDiv").style.display = "none";
      document.getElementById("ProjectNameDiv").style.display = "none";
      document.getElementById("DeleteDiv0").style.display = "none";
      document.getElementById("AddProject").style.display = "block";
    },50);

  }
}
function create_new_Project_db(title,date){
  var ref = firebase.database().ref('/data/' + 'testuser1' + '/project/');
  var new_memory_key = ref.push({
    title: title ,
    date: date ,
    writable : false
  });
  var key = String(new_memory_key).substring(53,1000);
  console.log(key);
  ref = firebase.database().ref('/data/' + 'testuser1' + '/project/'+key+'/flowchart');
  refmem = firebase.database().ref('/data/' + 'testuser1' + '/memory');
  var a= refmem.once('value',function(snapshot){
    var data = snapshot.val();
    var keys = Object.keys(data);
    for(var i = 0; i < keys.length; i++) {
      var year_ = parseDate(data[keys[i]]['Date'])[0];
      var month_ = parseDate(data[keys[i]]['Date'])[1];
      var date_ = parseDate(data[keys[i]]['Date'])[2];
      ref.push({
        comment : '',
        date : date_,
        importance : data[keys[i]]['importance'],
        month : month_,
        title : keys[i],
        year : year_
      });
    }
  });
  return key;
}




function read_project_db(){
  var ref = firebase.database().ref('/data/' + 'testuser1' + '/project/');
  var a = ref.orderByChild('date').once('value', function(snapshot){ 
    var data = snapshot.val();
    var keys = Object.keys(data);
    for(var i = 0; i < keys.length; i++){
      makep(data[keys[i]]['title'],data[keys[i]]['date'], keys[i],data[keys[i]]['writable']);
    }
  });
}

function delete_project_db(key) { 
  var ref = firebase.database().ref('/data/' + 'testuser1' + '/project/' + key);
  ref.remove();
}

function enterkey() {
  if (window.event.keyCode == 13) {
    Add();
  }
}

function getTime() {
  var date = new Date();
  return String(date.getFullYear() + '-' + (date.getMonth()+1 < 10 ? '0'+ (date.getMonth()+1) : date.getMonth()+1) + '-' +(date.getDate()<10?'0'+date.getDate():date.getDate())+ ' ' + (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':' + (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ':' +(date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()));
}

function parseDate(date){
  var dates = date.split("-");
  for(var i = 0; i < dates.length; i++){
    dates[i] = parseInt(dates[i]);
  }
  return dates;
}
initialize();



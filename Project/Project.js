
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
    ProjectName.focus();
  });
  var AddProject = document.createElement("div");
  AddProject.className = "add_project";
  AddProject.innerHTML = '<h1>ADD PROJECT</h1>';
  projectImage.appendChild(AddProject);

  var ProjectNameDiv = document.createElement("div");
  ProjectNameDiv.id = "ProjectNameDiv";
  ProjectNameDiv.innerHTML = "<input type = 'text' id = 'ProjectName' onkeyup='enterkey();'>"
  ProjectNameDiv.style.display = "none";
  projectWrapper.appendChild(ProjectNameDiv);

  document.getElementById("projects").appendChild(projectWrapper);  
}

//project boxs
function makep(title,date,key){
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
    });
  projectWrapper.addEventListener("mouseenter", function () {
      //enter
      TitleDate.style.display = 'none';    
      EditDiv.style.display = 'block';    
      WriteDiv.style.display = 'block';    
      TitleDateh.style.display = 'block';    
      DeleteDiv.style.display = 'block';    
    });
  var projectImage =document.createElement("div");
  projectWrapper.appendChild(projectImage);

  var projectImage1 = document.createElement("div");
  projectImage1.className = "project_image";
  projectImage1.id = projectWrapper.id+"_image";
  projectImage1.innerHTML = '<img src="./src/image/project/empty_project.png" width="200" border="0">';
  projectImage.appendChild(projectImage1);

  var TitleDate = document.createElement("div");
  TitleDate.innerHTML = "<h1>"+title + "</h1><br>" + date.substring(0,10);
  TitleDate.style.display = 'block';
  TitleDate.id = "TitleDate";
  projectImage.appendChild(TitleDate);

  var TitleDateh = document.createElement("div");
  TitleDateh.innerHTML = "<h1>"+title + "</h1><br>" + date;
  TitleDateh.style.display = 'none';
  TitleDateh.id = "TitleDateh";
  projectImage.appendChild(TitleDateh);

  var EditDiv = document.createElement("div");
  var EditButton = document.createElement("a");
  EditButton.id = "Button";
  EditButton.innerHTML = 'Edit project';
  EditButton.addEventListener("click", Edit);
  EditDiv.appendChild(EditButton);
  EditDiv.id = "EditDiv";
  EditDiv.style.display = 'none';  
  projectImage.appendChild(EditDiv);

  var WriteDiv = document.createElement("div");
  var WriteButton = document.createElement("a");
  WriteButton.id = "Button";
  WriteButton.innerHTML = 'Write draft';
  WriteButton.addEventListener("click", Write);
  WriteDiv.appendChild(WriteButton);
  WriteDiv.id = "WriteDiv";
  WriteDiv.style.display = 'none';  
  projectImage.appendChild(WriteDiv);

  var DeleteDiv = document.createElement("div");
  var DeleteButton = document.createElement("a");
  DeleteButton.innerHTML = '<i class="fas fa-times"></i>';
  DeleteButton.id = "DeleteButton";
  DeleteButton.addEventListener("click", function() {
    delete_project_db(key);
    document.getElementById(projectWrapper.id).remove();
  });
  DeleteDiv.appendChild(DeleteButton);
  DeleteDiv.id = "DeleteDiv";
  DeleteDiv.style.display = 'none';  
  projectImage.appendChild(DeleteDiv);

  document.getElementById("project0").after(projectWrapper);  

}

function Add() {
  var title = document.getElementById("ProjectName").value; 
  var date = getTime();
  var key = create_new_Project_db(title,date);
  makep(title,date,key);
  document.getElementById("ProjectName").value = "";
  document.getElementById("ProjectNameDiv").style.display = "none";
//  resetProjects();
}
function create_new_Project_db(title,date){
  var ref = firebase.database().ref('/data/' + 'testuser1' + '/project/');
  var new_memory_key = ref.push({
    title: title ,
    date: date
  });
  return String(new_memory_key).substring(53,1000);
}

function Edit() {
  location.replace("./Add_Questions/Add_Questions.html");

}
function Write() {
  location.replace("./Draft/Draft.html");

}


function read_project_db(){
  var ref = firebase.database().ref('/data/' + 'testuser1' + '/project/');
  var a = ref.orderByChild('date').once('value', function(snapshot){ 
    var data = snapshot.val();
    var keys = Object.keys(data);
    for(var i = 0; i < keys.length; i++){
      makep(data[keys[i]]['title'],data[keys[i]]['date'], keys[i]);
    }
  });
}

function delete_project_db(key) { 
  console.log("remove: " + '/data/' + 'testuser1' + '/project/' + key);
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
initialize();



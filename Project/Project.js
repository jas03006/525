﻿var projectNumber = 1;
var date = new Date();
var today = date.getFullYear() + '.' + date.getMonth() + '.' +date.getDate();

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

/*  var ProjectName = document.createElement("input");
  ProjectName.type = "text";
  ProjectName.id = "ProjectName";
  ProjectName. = "enterkey()";
  ProjectNameDiv.appendChild(ProjectName);
  */
  ProjectNameDiv.style.display = "none";
  projectWrapper.appendChild(ProjectNameDiv);

  document.getElementById("projects").appendChild(projectWrapper);  
}

//project boxs
function makep(title,project){
  var projectWrapper = document.createElement("div");
  projectWrapper.className = "project_wrapper";
  projectWrapper.id = "project" + projectNumber;
  projectNumber++;
  projectWrapper.addEventListener("mouseleave", function () {
      //leave
      console.log("leave\t"+ projectWrapper.id);
      TitleDate.style.display = 'block';    
      EditDiv.style.display = 'none';    
      WriteDiv.style.display = 'none';    
      TitleDateh.style.display = 'none';    
      DeleteDiv.style.display = 'none';    
    });
  projectWrapper.addEventListener("mouseenter", function () {
      //enter
      console.log("enter\t"+ projectWrapper.id);
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
  TitleDate.innerHTML = "<h1>"+title + "</h1><br>" + today;
  TitleDate.style.display = 'block';
  TitleDate.id = "TitleDate";
  projectImage.appendChild(TitleDate);

  var TitleDateh = document.createElement("div");
  TitleDateh.innerHTML = "<h1>"+title + "</h1><br>" + today;
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
    delete_project_db(title);
    var aa = document.getElementById(projectWrapper.id);
    while(aa.firstChild) {
      aa.removeChild(aa.firstChild);
    }
  });
  DeleteDiv.appendChild(DeleteButton);
  DeleteDiv.id = "DeleteDiv";
  DeleteDiv.style.display = 'none';  
  projectImage.appendChild(DeleteDiv);

  document.getElementById("projects").appendChild(projectWrapper);  

}

function Add() {
  var title = document.getElementById("ProjectName").value; 
  add_new_Project_db(title);
  makep(title);
  document.getElementById("ProjectName").value = "";
  document.getElementById("ProjectNameDiv").style.display = "none";
}
function Edit() {
  location.replace("./Add_Questions/Add_Questions.html");

}
function Write() {
  location.replace("./Draft/Draft.html");

}
function Delete(title) {
}

function add_new_Project_db(title){
  document.getElementById("overlay").style.width = "100%";
  create_new_Project_db(title);
  //write_new_Project_db();
  document.getElementById("overlay").style.width = "0";
}

function create_new_Project_db(title){
  var ref = firebase.database().ref('/data/' + 'testuser1' + '/project/');
  var new_memory_key = ref.child(title).set({
    flowchart: '' ,
    questions: '' ,
    date: today
  });
}

function read_project_db(){
  var ref = firebase.database().ref('/data/' + 'testuser1' + '/project/');
  var a = ref.once('value', function(snapshot){ 
    var data = snapshot.val();
    var keys = Object.keys(data);
    for(var i = 0; i < keys.length; i++){
      makep(keys[i],data[keys[i]]);
    }
  });
}

function delete_project_db(title) {
  var ref = firebase.database().ref('/data/' + 'testuser1' + '/project/' + title);
  ref.remove();
}
function write_new_Project_db(){
  firebase.database().ref('/data/' + now_account + '/project/' + title_.value.trim() ).set({
    Date: date_.value.trim() ,
    How_long: how_long_.value.trim()  ,
    What_you_did: what_.value.trim(),
    What_you_felt: what_you_felt_.value.trim(),
    Where: where_.value.trim(),
    Why: why_.value.trim(),
    With_whom: with_.value.trim(),
    importance: importance_
  });
}

function enterkey() {
  if (window.event.keyCode == 13) {
    Add();
  }
}
initialize();



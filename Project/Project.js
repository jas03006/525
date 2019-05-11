var temp = 0;
var projectNumber = 3;
var projectTitles = Array("abc","def","ghi");
var projectDates = Array("2016-01-01","2017/02/02","2018.03.03");
var hoverable=false;

function initialize(){
  makeProjects();
}
function makeProjects(){
  makeap();
  for (var i = 0; i < projectNumber; i++) {
    makep(i);
  }
  hoverable=true;
}

//add project box
function makeap() { 
  var projectWrapper = document.createElement("div");
  projectWrapper.className = "project_wrapper";
  projectWrapper.id = "project0"; // = add project tab


  var projectImage = document.createElement("div");
  projectImage.className = "project_imag";
  projectImage.id = "project0_image";
  projectImage.innerHTML = '<img src="./src/image/project/empty_project.png" width="200" border="0">';
  projectWrapper.appendChild(projectImage);

  var projectOptions = document.createElement("div");
  projectOptions.className = "project_options";
  projectOptions.innerHTML = '<h1>ADD PROJECT</h1>';
  projectImage.appendChild(projectOptions);

  document.getElementById("projects").appendChild(projectWrapper);  
  temp++;
}

//project boxs
function makep(i){
  var projectWrapper = document.createElement("div");
  projectWrapper.className = "project_wrapper";
    projectWrapper.id = "project" + (i+1); // = project #i+1 tab
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
    TitleDate.innerHTML = "<h1>"+projectTitles[i] + "</h1><br>" + projectDates[i];
    TitleDate.style.display = 'block';
    TitleDate.id = "TitleDate";
    projectImage.appendChild(TitleDate);

    var TitleDateh = document.createElement("div");
    TitleDateh.innerHTML = "<h1>"+projectTitles[i] + "</h1><br>" + projectDates[i];
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
    DeleteButton.addEventListener("click", Delete);
    DeleteDiv.appendChild(DeleteButton);
    DeleteDiv.id = "DeleteDiv";
    DeleteDiv.style.display = 'none';  
    projectImage.appendChild(DeleteDiv);

    document.getElementById("projects").appendChild(projectWrapper);  

  }

  function Edit() {
  location.replace("./Add_Questions/Add_Questions.html");

  }
  function Write() {
  location.replace("./Draft/Draft.html");

  }
  function Delete() {
  location.replace("#");

  }
  initialize();



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
  projectWrapper.addEventListener("mouseleave", function () {
    //leave
    console.log("leave\t"+ projectWrapper.id);
    projectImage1.style.display = 'block';
    projectImage2.style.display = 'none';
    projectOptions.style.display = 'none';    
  });
  projectWrapper.addEventListener("mouseenter", function () {
    //enter
    console.log("enter\t"+ projectWrapper.id);
    projectImage1.style.display = 'none';
    projectImage2.style.display = 'block';    
    projectOptions.style.display = 'block';    
  });

  var projectImage =document.createElement("div");
  projectWrapper.appendChild(projectImage);

  var projectImage1 = document.createElement("div");
  projectImage1.className = "project_imag1";
  projectImage1.id = "project0_image1";
  projectImage1.innerHTML = '<img src="./src/image/project/new_project.png" width="200" border="0">';
  projectImage.appendChild(projectImage1);

  var projectImage2 = document.createElement("div");
  projectImage2.className = "project_image2";
  projectImage2.id = "project0_image2";
  projectImage2.innerHTML = '<img src="./src/image/project/empty_project.png" width="200" border="0">';
  projectImage2.style.display = 'none';
  projectImage.appendChild(projectImage2);


  var projectOptions = document.createElement("div");
  projectOptions.className = "project_options";
  projectOptions.innerHTML = '<a href="./Add_Questions/Add_Questions.html">ADD PROJECT</a>';
  projectOptions.style.display = 'none';  
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
      projectOptions1.style.display = 'block';    
      projectOptions2.style.display = 'none';    
    });
    projectWrapper.addEventListener("mouseenter", function () {
      //enter
      console.log("enter\t"+ projectWrapper.id);
      projectOptions1.style.display = 'none';    
      projectOptions2.style.display = 'block';    
    });
    var projectImage =document.createElement("div");
    projectWrapper.appendChild(projectImage);

    var projectImage1 = document.createElement("div");
    projectImage1.className = "project_image";
    projectImage1.id = projectWrapper.id+"_image";
    projectImage1.innerHTML = '<img src="./src/image/project/empty_project.png" width="200" border="0">';
    projectImage.appendChild(projectImage1);

    var projectOptions1 = document.createElement("div");
    projectOptions1.className = "project_options";
    projectOptions1.innerHTML = projectTitles[i] + "<br>" + projectDates[i];
    projectOptions1.style.display = 'block';  
    projectImage.appendChild(projectOptions1);

    var projectOptions2 = document.createElement("div");
    projectOptions2.className = "project_options";
    projectOptions2.innerHTML = '<a href="./Add_Questions/Add_Questions.html">EDIT PROJECT</a><br><a href="./Draft/Draft.html">WRITE DRAFT</a><br><a href="#">DELETE PROJECT</a>';
    projectOptions2.style.display = 'none';  
    projectImage.appendChild(projectOptions2);

    document.getElementById("projects").appendChild(projectWrapper);  

  }

  function hover(id) {
    console.log("hover" + id);
  }

  initialize();



var temp = 0;
var memoryNumber = 6;
var hoverable=false;

function initialize(){
  setMemories();
}

function setMemories(){
  
  for (var i = 0; i < memoryNumber; i++) {
    setWrittenMemo(i);
  }
  for (var i = memoryNumber; i < 7; i++) {
  	setUnWrittenMemo(i);
  }
  
  hoverable=true;
}

function setWrittenMemo(i) { 
  var post = document.getElementById("post" + (i+2));
  post.className = "container";
  post.addEventListener("mouseleave", function () {
      //leave
      console.log("leave\t"+ post.id);
      projectOptions1.style.display = 'block';    
      projectOptions2.style.display = 'none';    
    });
    post.addEventListener("mouseenter", function () {
      //enter
      console.log("enter\t"+ post.id);
      projectOptions1.style.display = 'none';    
      projectOptions2.style.display = 'block';  
    });

  var postBox = document.getElementById("textbox" + (i+2));
    var projectOptions1 = document.getElementById("content" + (i+2));
    var projectOptions2 = document.getElementById("option" + (i+2));
  temp++;
}

function setUnWrittenMemo(i) { 
  var post = document.getElementById("post" + (i+2));
  post.className = "container_inv";
  post.addEventListener("mouseleave", function () {
      //leave
      console.log("leave\t"+ post.id);
      projectOptions1.style.display = 'block';    
      projectOptions2.style.display = 'none';    
    });
    post.addEventListener("mouseenter", function () {
      //enter
      console.log("enter\t"+ post.id);
      projectOptions1.style.display = 'none';    
      projectOptions2.style.display = 'block';  
    });

  var postBox = document.getElementById("textbox" + (i+2));
    var projectOptions1 = document.getElementById("content" + (i+2));
    var projectOptions2 = document.getElementById("option" + (i+2));
  temp++;
}

function go_add_memory(){
	// 뒤로가기 누르면 다시 앞페이지로 이동
    window.history.forward(1);
    // 기존 페이지를 새로운 페이지로 변경
    location.replace("./add_new_memory/Add_new_memory.html");
}

function hover(id) {
  console.log("hover" + id);
}

initialize();
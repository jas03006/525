var questionNum = 1;

function initialize(){
  
  addQuestionBox();
}

function deleteAll(){
  for(var i = 0; i < questionNum; i++){
    var qDivId = "qDiv" + (i + 1);
    document.getElementById(qDivId).remove();
  }
  document.getElementById("myButton").remove();
  document.getElementById("confirmDiv").remove();
  questionNum = 1;
  
  initialize();
}

function addQuestionBox(){
  var qDiv = document.createElement("div");
  var mDiv = document.createElement("div");
  var cDiv = document.createElement("div");
  //var mImgs = document.createEmelent("img");
  var memories = document.createElement("img");
  var comments = document.createElement("textarea");
  var buttonDiv = document.createElement("div");
  var addButton = document.createElement("a");
  var addQuestionText = document.createElement("div");
  var confirmDiv = document.createElement("div");
  var confirmButton = document.createElement("a");
  
  //Question box specification
  //Text area specification
  memories.className = "memoryBox";
  memories.id = "question1_" + questionNum;
  memories.src = "./../src/image/memory/post_it.png";

  comments.className = "commentBox";
  comments.id = "question2_" + questionNum;
  comments.placeholder = "Write Comments of Q" +  questionNum + " here";
/*
  mImgs.className = "memoryImg";
  mImgs.id = "memoryImg_" + questionNum;
  mImgs.src = "./../src/image/memory/post_it.png";
*/  
  //Enter listener
  //memories.addEventListener('keyup', enterEvent);
  //comments.addEventListener('keyup', enterEvent);
  qDiv.innerHTML = "<h2>Q" + questionNum + ". </h2><h3>Sample Question</h3>";
  mDiv.innerHTML = "Memories<br />"
  cDiv.innerHTML = "Comments<br />"
  mDiv.appendChild(memories);
  //memories.appendChild(mImgs);
  cDiv.appendChild(comments);
  qDiv.appendChild(mDiv);
  qDiv.appendChild(cDiv);
  qDiv.id = "qDiv" + questionNum;
  mDiv.id = "mDiv" + questionNum;
  cDiv.id = "cDiv" + questionNum;
  qDiv.className = "left";
  mDiv.className = "center";
  cDiv.className = "center";
  
  //Add question to the content
  document.getElementById("paper").appendChild(qDiv);
  
  //Add question button specification
  addButton.innerHTML = "+";
  addButton.className = "addButton";
  
  addButton.addEventListener("click", function (e){
    submit(comments);
  });
  
  addQuestionText.innerHTML = "Add Question";
  addQuestionText.style.color = "#3ea99f";
  
  buttonDiv.className = "center";
  buttonDiv.appendChild(addButton);
  buttonDiv.appendChild(addQuestionText);
  buttonDiv.id = "myButton";
  
  confirmButton.id = "confirmButton";
  confirmButton.innerHTML = "Confirm";
  confirmButton.addEventListener("click", confirm);
  confirmDiv.appendChild(confirmButton);
  confirmDiv.id = "confirmDiv";
  
  //Add button to the content
  document.getElementById("paper").appendChild(buttonDiv);
  document.getElementById("paper").appendChild(confirmDiv);
  
  return comments;
}

function confirm(){
  for(var i = 0; i < questionNum; i++){
    var question1Id = "question1_" + (i + 1);
    console.log(document.getElementById(question1Id).value);
    var question2Id = "question2_" + (i + 1);
    console.log(document.getElementById(question2Id).value);
  }
  deleteAll();

   // 뒤로가기 누르면 다시 앞페이지로 이동
  window.history.forward(1);
  // 기존 페이지를 새로운 페이지로 변경
  location.replace("https://jas03006.github.io/525/project.html");
}

function enterEvent(e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      // code for enter
      this.value = this.value.replace(/(\r\n|\n|\r)/gm, "");
      if(this.value != ""){
        submit(this);
        return;
      }
    }
}

function submit(questionBox){
  var question = questionBox.value;
  
  //Remove enter listener
  questionBox.removeEventListener('keyup', enterEvent);


  //Remove add button
  document.getElementById("myButton").remove();
  document.getElementById("confirmDiv").remove();
  questionNum++;

  //Add new questionBox
  addQuestionBox().focus();
}

initialize();
